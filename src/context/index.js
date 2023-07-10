import AuthProvider from "./providers/AuthProvider";

export default function Store({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
