export interface InstructionType {
  instruction_id: number;
  content: string;
  date: Date;
  group_id: number;
}

export interface InstructionCardProps {
  content: string;
  group_id: number
}
