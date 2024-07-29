"use client";
import { useSelector } from "react-redux";
import { PageContainer } from "../components";
import OverviewCard from "./components/OverviewCard";
import { RootState } from "@store";

function Details() {
  const user = useSelector((state: RootState) => state.global.user);
  return (
    <PageContainer heading="Account Overview">
      <div className="flex flex-col md:flex-row p-4 gap-4 md:gap-2 lg:gap-8">
        <OverviewCard
          heading="Account Details"
          subheading={user.user_name}
          info={[user.email]}
        />
        <OverviewCard
          heading="Account Details"
          subheading={user.user_name}
          info={[
            user.email,
            user.address,
            user.city,
            user.country,
            `+234${user.mobile_no}`,
          ]}
        />
      </div>
    </PageContainer>
  );
}

export default Details;
