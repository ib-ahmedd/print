import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function GenericLink({ path, title }: GenericLinkProps) {
  return (
    <Link
      href={path}
      className="bg-site-orange text-white py-2 px-8 w-fit rounded-md mt-6"
    >
      <FontAwesomeIcon icon={faAngleRight} /> {title}
    </Link>
  );
}

interface GenericLinkProps {
  path: string;
  title: string;
}

export default GenericLink;
