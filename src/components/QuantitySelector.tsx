import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  motion,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { BiMinus, BiPlus } from "react-icons/bi";

interface QuantitySelectorProps {
  id: number;
  availableQuantity: number;
  quantity: number;
  onQuantityChange: (id: number, quantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  id,
  availableQuantity,
  quantity,
  onQuantityChange,
}) => {
  const [value, setValue] = useState<number>(quantity);

  useEffect(() => {
    if (value >= 1 && value <= availableQuantity) {
      onQuantityChange(id, value);
    }
  }, [value, availableQuantity, id, onQuantityChange]);

  return (
    <div className="relative flex h-full w-full max-w-[14rem] items-center justify-center overflow-hidden rounded-lg px-9 py-10">
      <button
        type="button"
        className="p-2 transition-colors rounded hover:bg-gray-200/50 hover:shadow"
        onClick={() => {
          if (value > 1) {
            setValue(value - 1);
          }
        }}>
        <BiMinus size={16} />
      </button>
      <NumericCounter
        value={value}
        className="flex w-[5vw] justify-center text-2xl font-medium drop-shadow"
      />
      <button
        type="button"
        className="p-2 transition-colors rounded hover:bg-gray-200/50 hover:shadow"
        onClick={() => {
          if (value < availableQuantity) {
            setValue(value + 1);
            toast.success("Added");
          } else {
            toast.error("Product not in stock");
          }
        }}>
        <BiPlus size={16} />
      </button>
    </div>
  );
};

export default QuantitySelector;

interface CounterProps {
  value: number;
  className?: string;
}

function NumericCounter({ value, className }: CounterProps): React.JSX.Element {
  const [previousValue, setPreviousValue] = useState(value);
  const [change, setChange] = useState(0);
  const [isIncrease, setIsIncrease] = useState(true);

  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) =>
    Math.round(current as number).toLocaleString()
  );

  useEffect(() => {
    const difference = value - previousValue;
    if (difference !== 0) {
      setChange(Math.abs(difference));
      setIsIncrease(difference > 0);
      setTimeout(() => setChange(0), 1000);
    }
    setPreviousValue(value);
    spring.set(value);
  }, [spring, value, previousValue]);

  return (
    <div className={className}>
      <motion.span>{display}</motion.span>
      <AnimatePresence>
        {change > 0 && (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`text-sm absolute -top-10 translate-x-1/2 ${
              isIncrease ? "text-green-500" : "text-red-500"
            }`}>
            {isIncrease ? "+" : "-"}
            {change.toLocaleString()}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
