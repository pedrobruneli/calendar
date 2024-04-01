import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col p-4">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Coming Events</h2>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Hour</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>Meeting</TableCell>
                <TableCell>30 minutes</TableCell>
                <TableCell>01/05/2024</TableCell>
                <TableCell>10:00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Another guy</TableCell>
                <TableCell>Meeting</TableCell>
                <TableCell>30 minutes</TableCell>
                <TableCell>01/05/2024</TableCell>
                <TableCell>11:00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
