import {
  IconCoffee,
  IconProps,
  IconHeartPin,
  IconPizza,
  IconFish,
  IconBurger,
  IconMapPin2,
  IconEggFried,
} from "@tabler/icons-react-native"

export const categoriesIcons: Record<string, React.ComponentType<IconProps>> = {
  "todos": IconMapPin2, // Todos
  "f6901842-b8b5-11ef-a970-3a8a0069a577": IconHeartPin, // Regional
  "f6901hc1-b8b5-11ef-a970-3a8a0069a577": IconEggFried, // Brasileira
  "f6901b67-b8b5-11ef-a970-3a8a0069a577": IconPizza, // Pizzaria
  "f6901cfc-b8b5-11ef-a970-3a8a0069a577": IconFish, // Japonesa
  "f6901dab-b8b5-11ef-a970-3a8a0069a577": IconBurger, // Hamburguerias
  "f6901e0c-b8b5-11ef-a970-3a8a0069a577": IconCoffee, // Cafeteria
}
