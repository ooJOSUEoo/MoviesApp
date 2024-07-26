import { View, Text } from "react-native";

export function Score({ cN, score, maxScore }: any) {
  const getColor = () => {
    const percentage = (score / maxScore) * 100;
    if (percentage < 40) return "bg-red-500";
    if (percentage < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const color = getColor();

  return (
    <View
      className={`${color} w-5 h-5 rounded-full justify-center items-center ${cN}`}
    >
      <Text className="text-sm font-bold text-white">{score}</Text>
    </View>
  );
}
