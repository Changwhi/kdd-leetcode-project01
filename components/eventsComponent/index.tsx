"use client";

import { CONSTANTS } from "@/text/summary";
import { EventTable } from "./eventTable";
import { SubmitPopup } from "./submitPopUp";
import { useState } from "react";

export const EventsComponent = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <h2 className="text-lg font-bold">{CONSTANTS.UPCOMING_EVENTS_TITLE}</h2>
      <div className="space-y-4 mt-4">
        <EventTable setOpenModal={setOpenModal}></EventTable>
        <SubmitPopup openModal={openModal} setOpenModal={setOpenModal}></SubmitPopup>
      </div>
    </>
  );
};
