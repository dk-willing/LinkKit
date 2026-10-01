import { useEffect, useState } from "react";

export default function Footer() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="border-t border-gray-700">
      <div className="container max-w-5xl px-2 mx-auto">
        <div className="flex items-center justify-between py-5">
          <div>
            <p>Dev-Qwecu &copy;</p>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <p>
                {new Date().getDate() < 10
                  ? `0${new Date().getDate()}`
                  : new Date().getDate()}
                -
                {new Date().getMonth() < 10
                  ? `0${new Date().getMonth()}`
                  : new Date().getMonth()}{" "}
                - {new Date().getFullYear()}
              </p>

              <p>, {now.toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
