import React from "react";
import Link from "next/link";
type Props = {
  category: String;
};

const RecentJobInfo = ({ category }: Props) => (
  <Link href="/users/[id]">{category}</Link>
);

export default RecentJobInfo;
