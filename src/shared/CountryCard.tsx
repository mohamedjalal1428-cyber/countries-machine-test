import { Card } from "react-bootstrap";

interface Props {
  name: string;
  flag: string;
  region: string;
}

export default function CountryCard({ name, flag, region }: Props) {
  return (
    <Card className="h-100 !border-2 !border-[#3E3E3E] shadow-[10px_10px_#d1d5db] country-card !rounded-none py-2">
      <Card.Body className="d-flex align-items-center gap-3">
        <div
          style={{
            width: "50px",
            height: "35px",
            overflow: "hidden",
            backgroundColor: "#f8f9fa",
            flexShrink: 0,
          }}
        >
          <img
            src={flag}
            alt={`${name} flag`}
            className="w-120 h-120 object-fit-cover"
            loading="lazy"
          />
        </div>

        <div>
          <Card.Title className="fs-6 fw-bold mb-0">{name}</Card.Title>
          <Card.Text className="text-muted small mb-0">
            {region || "—"}
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}
