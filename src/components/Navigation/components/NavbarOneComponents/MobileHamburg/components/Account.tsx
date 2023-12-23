import { ExternalLink, SquareUser } from "lucide-react";
import Link from "next/link";

const Account = () => {
  return (
    <Link
      href={`/account`}
      className="items-center rounded-lg pr-4 mb-2 flex justify-between h-10 hover:bg-gray-300 w-full"
    >
      <div className="space-x-4 px-4 flex">
        <SquareUser />
        <p>Account</p>
      </div>
      <ExternalLink />
    </Link>
  );
};
export default Account;
