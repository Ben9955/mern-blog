import { Button } from "flowbite-react";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center my-10">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl ">Want to learn more about javascript</h2>

        <p className="text-gray-500 my-2">
          Check out these resources with 100 Javsacript Projects
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a href="#" target="_blank" rel="noopener" noreferrer>
            Learn More
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript/execution.png" />
      </div>
    </div>
  );
};

export default CallToAction;
