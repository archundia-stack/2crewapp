import { notFound } from "next/navigation";
import { offers, offerById, eventById } from "@/lib/data";
import { OfferDetail } from "./offer-detail";

export function generateStaticParams() {
  return offers.map((o) => ({ id: o.id }));
}

export default async function OfertaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const offer = offerById(id);
  if (!offer) notFound();
  return <OfferDetail offer={offer} event={eventById(offer.eventId)!} />;
}
