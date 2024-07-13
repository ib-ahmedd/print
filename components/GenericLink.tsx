import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function GenericLink({ path, title, border }: GenericLinkProps) {
  return (
    <Link
      href={path}
      className={`shrink-0 bg-site-orange text-white py-2 px-8 w-fit rounded-md ${
        border && "border-2 border-white"
      }`}
    >
      <FontAwesomeIcon icon={faAngleRight} /> {title}
    </Link>
  );
}

interface GenericLinkProps {
  path: string;
  title: string;
  border?: boolean;
}

export default GenericLink;
