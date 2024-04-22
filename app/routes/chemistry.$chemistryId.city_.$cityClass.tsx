import { useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
import type { LoaderFunctionArgs } from "@remix-run/server-runtime";
import CityDetailContent from "~/src/content/city/CityDetailContent";

export async function loader({
    params,
}: LoaderFunctionArgs) {
    return params.cityClass;
}

export default function ChemistryCityDetail() {
    const cityClass = useLoaderData<typeof loader>();
    const validCityClass = [ "metropolis", "nature", "history" ]

    return(
        validCityClass.includes(cityClass) 
        ?
        <CityDetailContent cityClass={cityClass as "metropolis" | "nature" | "history" }/>
        :
        redirect("../..")
    )
}