import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AccountInfoCard = ({
  email,
  name,
  created_at,
}: {
  email: string;
  name: string;
  created_at: string;
}) => {
  const infos = [
    {
      label: "Email",
      value: email,
    },
    {
      label: "Name",
      value: name,
    },
    {
      label: "Member Since",
      value: created_at,
    },
    {
      label: "Last Login",
      value: "asfasf",
    },
  ];
  return (
    <Card className=" md:w-3/4">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-secondary-500">
          Account Information
        </CardTitle>
        <CardDescription>
          Your account information is listed here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {infos.map((info, i) => (
          <p
            className="text-text-500 flex items-center justify-between"
            key={`info-${i}`}
          >
            <span>{info.label}</span>

            <span className="font-semibold text-lg">{info.value}</span>
          </p>
        ))}
      </CardContent>
    </Card>
  );
};

export default AccountInfoCard;
