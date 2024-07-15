import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { contactDetails } from "../constants";

function Hello() {
  return (
    <div className="w-full md:w-1/2 pr-12 flex flex-col gap-8">
      <div>
        <h1 className="mb-4 md:mb-8">Say Hello.</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>
      </div>

      <div className="half_border flex flex-col gap-4 py-8 ">
        {contactDetails.map((item) => (
          <article className="flex items-center gap-4">
            <span className="text-site-orange">
              <FontAwesomeIcon icon={item.icon} />
            </span>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Hello;
