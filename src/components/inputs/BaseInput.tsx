import { type ChangeEvent } from "react";

type Props = {
  error: string | null,
  rtl?: boolean,
  title: string,
  onlyNumber?: boolean,
  state: string,
  setState: React.Dispatch<React.SetStateAction<string>>
}

export default function BaseInput({ error, rtl = true, title, onlyNumber = false, state, setState}: Props) {

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (onlyNumber) {
      e.target.value = e.target.value.replace(/\D/g, "");
      setState(e.target.value)
    }
  };

  return (
    <div className="w-full flex items-start justify-center flex-col gap-1">
      <div
        className={`w-full h-[48px] text-[17px] rounded-md flex items-center justify-center relative border ${
          error ? "border-red-300" : "border-gray-300"
        }`}
      >
        <input
          type="text"
          className={`w-full h-full outline-none border-none px-3 pt-[1px] ${
            !rtl ? "text-left" : ""
          }`}
          placeholder={title}
          inputMode={onlyNumber ? "numeric" : "text"}
          value={state}
          onChange={(e) => setState(e.target.value)}
          onInput={handleInput}
        />

        {error ? (
          <svg
            className={`size-5 absolute ${onlyNumber ? 'right-3' : 'left-3'} fill-red-600`}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            width="512"
            height="512"
          >
            <g>
              <path d="M256,512c141.385,0,256-114.615,256-256S397.385,0,256,0S0,114.615,0,256C0.153,397.322,114.678,511.847,256,512z    M234.667,128c0-11.782,9.551-21.333,21.333-21.333c11.782,0,21.333,9.551,21.333,21.333v170.667   c0,11.782-9.551,21.333-21.333,21.333c-11.782,0-21.333-9.551-21.333-21.333V128z M256,384c11.782,0,21.333,9.551,21.333,21.333   s-9.551,21.333-21.333,21.333c-11.782,0-21.333-9.551-21.333-21.333S244.218,384,256,384z" />
            </g>
          </svg>
        ) : (
          ""
        )}
      </div>
      {error ? <p className="text-red-600 text-sm">{error}</p> : ""}
    </div>
  );
}
