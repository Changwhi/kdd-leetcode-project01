"use server";
import { sql } from "@/utils/db";
import { EventCardProps, EventType } from "@/types/event";

export const retrieveEvents = async () => {
  try {
    const response: EventType[] = await sql`SELECT * FROM event`;
    if (response) {
      return response;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addEvent = async (formData: EventCardProps) => {
  try {
    if (!formData) {
      return [];
    }
    console.log(formData.name);
    const name = formData.name;
    const date = formData.date;
    const topic = formData.topic;
    const zoomlink = formData.zoomlink;
    const group_id = formData.group_id;

    await sql`
      INSERT INTO event (name, date, topic, zoomlink, group_id)
      VALUES (${name}, ${date}, ${topic}, ${zoomlink}, ${group_id})
    `;
  } catch (error) {
    console.log(error);
  }
};
