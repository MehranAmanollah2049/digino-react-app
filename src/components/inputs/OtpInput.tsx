import React, { useEffect, useRef, type ChangeEvent, type KeyboardEvent } from 'react';

type Props = {
  state: (number | '')[],
  setState: React.Dispatch<React.SetStateAction<(number | '')[]>>,
  error: string | null,
}

const OtpInput = React.memo(({ state, setState, error }: Props) => {
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 1);
    const newState = [...state];
    newState[index] = val ? Number(val) : '';
    setState(newState);

    if (val && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && state[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <>
      {state.map((val, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          onChange={(e) => handleInputChange(e, Number(index))}
          onKeyDown={(e) => handleBackspace(e, Number(index))}
          className={`w-1/5 h-full outline-none text-[24px] font-bold border rounded-md border-gray-300 px-3 transition-all focus:shadow-2xl focus:border-black text-center ${
            error ? 'border-red-500' : ''
          }`}
        />
      ))}
    </>
  );
})

export default OtpInput