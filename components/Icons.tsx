import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export const FA6 = ({
  name,
  size = 24,
  color = "white",
  props,
}: {
  name: string;
  size?: number;
  color?: string;
  props?: any;
}) => <FontAwesome6 name={name} size={size} color={color} {...props} />;
export const FA = ({
  name,
  size = 24,
  color = "white",
  props,
}: {
  name: string;
  size?: number;
  color?: string;
  props?: any;
}) => <FontAwesome name={name} size={size} color={color} {...props} />;
// "circle-info"
// "home"
// "info"
