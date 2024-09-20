import { AttendanceCard } from "./attendanceCard";
import { AttendanceTable } from "./attendanceTable";

/**
 * @function Attendance
 * @description Component that displays attendance information for a particular event in a group.
 * @param {Object} props Component props.
 * @param {number} props.event_id The event ID.
 * @param {number} props.group_id The group ID.
 * @returns {ReactElement} A React component that displays attendance information.
 */
export default function Attendance({
  event_id,
  group_id,
}: {
  event_id: number;
  group_id: number;
}) {
  return (
    <>
      <AttendanceTable event_id={event_id} group_id={group_id} />
    </>
  );
}
