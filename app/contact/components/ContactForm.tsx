"use client";

import { faCheck, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import checkFormComplete from "@utils/checkFormComplete";
import axios from "axios";
import { useState } from "react";

function ContactForm() {
  const [inputs, setInputs] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [formIncomplete, setFormIncomplete] = useState(false);
  const [sendError, setSendError] = useState(false);

  function handleInputs(e: any) {
    setFormIncomplete(false);
    setSendError(false);
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit() {
    setSending(true);
    setSendError(false);
    setFormIncomplete(false);
    if (checkFormComplete(inputs, 3)) {
      try {
        await axios.post(
          "https://print-server-wxgg.onrender.com/api/send-message",
          inputs
        );
        setSendSuccess(true);
      } catch (err) {
        setSendError(true);
        console.log(err);
      }
    } else {
      setSendError(true);
      setFormIncomplete(true);
    }
    setSending(false);
  }

  function handleResendMessage() {
    setSendSuccess(false);
    setInputs((prev) => {
      return { ...prev, message: "", subject: "" };
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="contact_form w-full md:w-1/2 flex flex-col gap-4 md:gap-6 rounded-md bg-white border-2 border-gray-200 px-4 lg:px-8 py-8 md:py-20"
    >
      {!sendSuccess && (
        <>
          <h2>Ask Your Queries</h2>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={inputs.email}
            onChange={handleInputs}
            className={
              formIncomplete && inputs.email === ""
                ? "border-red-500 bg-red-50"
                : ""
            }
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={inputs.subject}
            onChange={handleInputs}
            className={
              formIncomplete && inputs.subject === ""
                ? "border-red-500 bg-red-50"
                : ""
            }
          />
          <textarea
            placeholder="Message"
            name="message"
            className={`p-3 h-20 md:h-28 border border-gray-200 ${
              formIncomplete &&
              inputs.message === "" &&
              "border-red-500 bg-red-50"
            }`}
            onChange={handleInputs}
          />

          {sendError && (
            <div className="relative">
              <div className="absolute w-full h-full bg-red-600 opacity-10 rounded-lg" />
              {formIncomplete ? (
                <p className="text-red-600 font-bold text-sm p-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faWarning} /> Fill all input fields!
                </p>
              ) : (
                <p className="text-red-600 font-bold text-sm p-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faWarning} /> Error sending message!{" "}
                  <span className="font-normal">Please try again.</span>
                </p>
              )}
            </div>
          )}

          <button
            value={inputs.message}
            disabled={sending ? true : false}
            className={`shrink-0 bg-site-orange text-white py-2 px-8 w-fit rounded-md text-sm ${
              sending && "opacity-50"
            }`}
          >
            SEND MESSAGE
          </button>
        </>
      )}

      {sendSuccess && (
        <div className="flex flex-col justify-center items-center gap-4 w-full h-[26em] md:max-w-[35em] rounded-xl relative">
          <div className="absolute w-full h-full bg-green-500 opacity-10 rounded-xl" />
          <div className="flex flex-col items-center text-green-500 p-4 z-10 text-center">
            <p className="font-bold flex flex-col md:flex-row items-center md:items-baseline gap-2">
              <span className="bg-green-500 min-w-7 min-h-7 rounded-full text-white flex items-center justify-center">
                <FontAwesomeIcon icon={faCheck} />
              </span>
              Thank you! Your message has been successfully sent.
            </p>
            <p>We will get back to you soon!</p>
          </div>
          <button
            className="bg-site-orange hover:bg-site-orange-hover text-white text-sm py-2 px-8 rounded z-10"
            onClick={handleResendMessage}
          >
            RESEND MESSAGE
          </button>
        </div>
      )}
    </form>
  );
}

export default ContactForm;
