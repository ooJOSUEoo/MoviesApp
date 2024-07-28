import {
  FontAwesome6,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";

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
export const MI = ({
  name,
  size = 24,
  color = "white",
  props,
}: {
  name: string;
  size?: number;
  color?: string;
  props?: any;
}) => <MaterialIcons name={name} size={size} color={color} {...props} />;
export const MCI = ({
  name,
  size = 24,
  color = "white",
  props,
}: {
  name: string;
  size?: number;
  color?: string;
  props?: any;
}) => (
  <MaterialCommunityIcons name={name} size={size} color={color} {...props} />
);
