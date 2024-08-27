import { apiMiddleware } from "@/components/utils/apimiddleware";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import axios from "axios";

const prisma = new PrismaClient();
const pickup_postcode = 500018;

export async function GET(request: NextRequest) {
  try {
    const { id } = (await apiMiddleware(request)) as { id: string };
    if (!id) {
      return new Response(JSON.stringify({ error: "Not Authorised" }), {
        headers: {
          "Content-type": "application/json",
        },
        status: 401, // Unauthorized
      });
    }
    const searchParams = request.nextUrl.searchParams;
    const pincode = searchParams.get("pincode") as string;
    const weight = searchParams.get("weight") as string;

    let data = await shippingRateCalculation(
      pickup_postcode,
      Number(pincode),
      Number(weight)
    );
    if (!data) {
      return new Response(
        JSON.stringify({
          estimated_delivery_days: null,
          etd: null,
          freight_charge: 99,
          courier_company_id: null,
          courier_name: null,
        }),
        {
          headers: {
            "Content-type": "application/json",
          },
          status: 200, // Unauthorized
        }
      );
    }
    let [cheapest, ...rest] = data.available_courier_companies.sort(
      (a: any, b: any) => a.freight_charge - b.freight_charge
    );
    let {
      estimated_delivery_days,
      etd,
      freight_charge,
      courier_company_id,
      courier_name,
    } = cheapest;
    let obj = {
      estimated_delivery_days,
      etd,
      freight_charge,
      courier_company_id,
      courier_name,
    };
    return new Response(JSON.stringify(obj), {
      headers: {
        "Content-type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: {
        "Content-type": "application/json",
      },
      status: 500,
    });
  }
}
async function shippingRateCalculation(
  pickup_postcode: Number,
  delivery_postcode: Number,
  weight: Number
) {
  try {
    let token = await getShiprocketToken();
    let params = {
      pickup_postcode: pickup_postcode,
      delivery_postcode: delivery_postcode,
      cod: 0, // 0 for Prepaid, 1 for COD
      weight: weight, // Weight in kg
      length: 10, // Dimensions in cm
      breadth: 10,
      height: 10,
    };
    if (token) {
      var config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://apiv2.shiprocket.in/v1/external/courier/serviceability",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: params,
      };
      let response = await axios(config);
      return response.data.data;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}
async function getShiprocketToken() {
  const response = await axios.post(
    "https://apiv2.shiprocket.in/v1/external/auth/login",
    {
      email: process.env.SHIPROCKET_USER,
      password: process.env.SHIPROCKET_PASSWORD,
    }
  );
  return response.data.token;
}
