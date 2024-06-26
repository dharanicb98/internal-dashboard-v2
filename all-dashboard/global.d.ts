// React Elements types
interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: React.ReactNode;
  buttonClass?: string;
}
interface Children {
  children: React.ReactNode;
}

// Generic Function types
interface KeyValue<T = string> {
  key: string;
  value: T;
}

type VoidFunction = () => void;

type StringObject = Record<string, string>;

type TimeRangeKeys = "from" | "to";

interface LatLng {
  lat: number;
  lng: number;
}

// States types
interface UserData {
  userId: string;
}

// API types
interface APIResponse<T> {
  error: boolean;
  message: string;
  data: T;
}

// Google map
type Library =
  | "core"
  | "maps"
  | "places"
  | "geocoding"
  | "routes"
  | "marker"
  | "geometry"
  | "elevation"
  | "streetView"
  | "journeySharing"
  | "drawing"
  | "visualization";
