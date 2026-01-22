import Image from "next/image";

export default function Home() {
  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "40vh", marginLeft: "40vw" }}>
      <div>
      <h1>Welcome to Ariel Solutions</h1>
      <p>Innovative Tech Solutions For Businesses</p>
      <Image
        src="/ariel-logo.png"
        alt="Ariel Solutions Logo"
        width={200}
        height={200}
      />
      </div>
    </div>
      
  );
}
