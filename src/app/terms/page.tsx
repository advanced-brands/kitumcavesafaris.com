import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/packages";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for booking travel experiences with Kitum Cave Safaris Limited.",
};

export default function TermsPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-brand-forest">
        <div className="section-padding max-w-[1600px] mx-auto">
          <p className="label-text !text-brand-terracotta mb-4">Legal</p>
          <h1 className="heading-display text-white mb-4">Terms &amp; Conditions</h1>
          <p className="body-large !text-white/70 max-w-2xl">
            Please read these terms carefully. Confirming a safari with Kitum Cave
            Safaris assumes that you have read, fully understand, and accept the
            terms below.
          </p>
        </div>
      </section>

      <section className="section-padding section-spacing">
        <div className="max-w-3xl mx-auto prose-legal space-y-12">
          <p className="body-text">
            If you have any questions, please contact us at{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-brand-forest underline underline-offset-2">
              {siteConfig.email}
            </a>{" "}
            or WhatsApp{" "}
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              className="text-brand-forest underline underline-offset-2"
            >
              {siteConfig.whatsappDisplay}
            </a>
            .
          </p>

          <section>
            <h2 className="heading-sub text-brand-forest mb-4">1. Bookings</h2>
            <div className="space-y-4 body-text text-sm">
              <p>
                <strong>1.1</strong> Kitum Cave Safaris Limited provides
                transportation, accommodation bookings, restaurant meals,
                excursions, and other services in cooperation with independent
                suppliers.
              </p>
              <p>
                <strong>1.2</strong> All information detailed in client
                itineraries is given to the best of Kitum Cave Safaris&apos;
                knowledge and based on the latest information available. Kitum
                Cave Safaris cannot be liable for modified information from third
                parties, nor for any obvious typing errors.
              </p>
              <p>
                <strong>1.3</strong> To reserve flights and gorilla permits we
                need: your full names as they appear in your passport, your
                nationality, and passport number.
              </p>
              <p>
                <strong>1.4</strong> Before confirming a safari, the client must
                inform Kitum Cave Safaris of any preferences and special requests
                of the participants — e.g. medical needs, diet, requirements
                relating to disabilities, and any other requirements. Kitum Cave
                Safaris will meet the requests if possible.
              </p>
              <p>
                <strong>1.5</strong> All packages are subject to availability and
                not guaranteed until confirmed. Many lodges and hotels offered by
                Kitum Cave Safaris have limited capacity and therefore it is
                essential to make reservations well in advance of your planned
                trip.
              </p>
              <p>
                <strong>1.6</strong> In the event that you wish to amend your
                reservation in any way, Kitum Cave Safaris will make the preferred
                adjustment where practicable and possible and confirm accordingly.
                Kitum Cave Safaris reserves the right to charge an amendment fee
                relative to the actual costs, which will be added to the total
                invoice.
              </p>
              <p>
                <strong>1.7</strong> Kitum Cave Safaris reserves the right to
                change and re-adjust the tour schedule, transportation,
                accommodation, and services indicated in the itinerary in the
                event of unforeseen circumstances before arrival. Any changes to
                the itinerary will be communicated to the client as soon as
                possible.
              </p>
            </div>
          </section>

          <section>
            <h2 className="heading-sub text-brand-forest mb-4">2. Prices</h2>
            <div className="space-y-4 body-text text-sm">
              <p>
                <strong>2.1</strong> The prices quoted for the various safaris are
                as per the itinerary and include the following services, unless
                stated otherwise: overnight in hotels, guesthouses, tents or
                lodges; all meals as indicated; sightseeing as detailed in the
                itinerary; park entrance fees and ranger fees; airport transfers
                where applicable; ground transportation; English-speaking
                driver/guides; and bottled mineral water in the vehicle.
              </p>
              <p>
                <strong>2.2</strong> Expenses that are not covered: international
                and domestic air fares, visas and passports, meals not mentioned
                in the itinerary, drinks other than the mineral water provided in
                the vehicle, tips and gratuities for the guides and accommodation
                staff, laundry, travel insurance, and other items of a personal
                nature.
              </p>
              <p>
                <strong>2.3</strong> Prices on the website or quoted to our
                clients are subject to change without notice and are not
                guaranteed until confirmed in writing.
              </p>
              <p>
                <strong>2.4</strong> Kitum Cave Safaris reserves the right to
                adjust prices at any time should there be any fluctuation in the
                exchange rate or increase in the cost of any element of the tour.
                The company will however make every effort to minimise any
                increases.
              </p>
            </div>
          </section>

          <section>
            <h2 className="heading-sub text-brand-forest mb-4">
              3. Execution of the Tour
            </h2>
            <div className="space-y-4 body-text text-sm">
              <p>
                <strong>3.1</strong> It is a privilege to see animals in their
                natural habitat and as such, we cannot guarantee wildlife or game
                viewing. You must take caution when viewing the animals and
                carefully follow the instructions given by either the tour guide
                or wildlife rangers.
              </p>
              <p>
                <strong>3.2</strong> A gorilla or chimpanzee permit guarantees
                clients will be able to track the primates in question but does
                not guarantee that the animals will be in plain sight.
              </p>
              <p>
                <strong>3.3</strong> Accommodation is based on a twin or double
                bedded room, tent or banda, with private bathroom where possible.
                Single rooms may be available with the payment of a supplement fee
                but availability cannot always be guaranteed.
              </p>
              <p>
                <strong>3.4</strong> Kitum Cave Safaris reserves the right to
                substitute equivalent or superior hotels. If a hotel of equivalent
                standard is not available, Kitum Cave Safaris may substitute the
                next best quality hotel or suggest superior standard accommodation
                (extra charges may apply).
              </p>
              <p>
                <strong>3.5</strong> The mode of transport used will be dependent
                on the number of clients and the route taken, based on the
                specifications of the chosen itinerary. Every effort is made to
                ensure that vehicles are provided in a roadworthy condition but no
                liability can be accepted for a puncture, breakdown, damage, or
                any delay as a result of poor road conditions.
              </p>
              <p>
                <strong>3.6</strong> Experienced English-speaking driver/guides
                are a key part of your tour. They are the only person(s) allowed
                to drive Kitum Cave Safaris&apos; vehicles. The driver&apos;s
                decision on all matters, such as the route taken, is final.
              </p>
              <p>
                <strong>3.7</strong> Kitum Cave Safaris reserves the right to
                alter any route or arrangement, to cancel the operation of any
                scheduled tour, or vary the safari services in any way in the
                event of unforeseen circumstances, such as road closures, bad
                weather, problems with national parks or hotels, and security
                considerations. In such cases, alternative arrangements will be
                made as circumstances permit.
              </p>
              <p>
                <strong>3.8</strong> Kitum Cave Safaris reserves the right to
                employ subcontractors to carry out all or part of the services
                agreed to be supplied.
              </p>
              <p>
                <strong>3.9</strong> Kitum Cave Safaris reserves the right to
                refuse any person from participating or continuing any tour if, in
                Kitum Cave Safaris&apos; opinion or in the opinion of any other
                person in authority, the person concerned behaves in such a way as
                to cause or be likely to cause danger, hazard or inconvenience to
                any third party, damage to property or to environments and
                ecosystems. No refunds will be made and Kitum Cave Safaris shall
                not be liable for expenses incurred as a result of the
                termination.
              </p>
            </div>
          </section>

          <section>
            <h2 className="heading-sub text-brand-forest mb-4">4. Payment</h2>
            <div className="space-y-4 body-text text-sm">
              <p>
                <strong>4.1</strong> All tours will be booked and confirmed only
                upon receipt of a {siteConfig.partialPaymentPercent}% deposit of
                the basic program rate. For gorilla permits, a full advance
                payment of the permit fee is required in order to make the
                reservation.
              </p>
              <p>
                <strong>4.2</strong> The payment balance is due no later than 42
                days prior to the safari, unless agreed otherwise.
              </p>
              <p>
                <strong>4.3</strong> Bookings made within 42 days before arrival
                must be paid in full at the time of confirmation.
              </p>
              <p>
                <strong>4.4</strong> If payment is not received in accordance with
                the above, Kitum Cave Safaris has the right to cancel the booking.
              </p>
              <p>
                <strong>4.5</strong> Payment can be made online through our
                secure payment partner (Flutterwave), by bank transfer, or by
                other methods confirmed in writing before the start of the safari.
                Card and mobile money options available via Flutterwave may
                attract processing fees charged by the payment provider; any such
                fees will be disclosed at checkout where applicable. Traveller
                cheques are not accepted.
              </p>
              <p>
                <strong>4.6</strong> The costs of international bank transfers and
                any payment-provider service charges are to be fully paid by the
                client.
              </p>
            </div>
          </section>

          <section>
            <h2 className="heading-sub text-brand-forest mb-4">
              5. Cancellations and Refunds
            </h2>
            <div className="space-y-4 body-text text-sm">
              <p>
                <strong>5.1</strong> All cancellation requests must be made in
                writing and shall be effective on the date of actual receipt by
                Kitum Cave Safaris.
              </p>
              <p>
                <strong>5.2</strong> The following cancellation charges apply to
                the basic program rate:
              </p>
              <div className="overflow-x-auto border border-brand-sand-dark">
                <table className="w-full text-left text-sm">
                  <thead className="bg-brand-sand">
                    <tr>
                      <th className="p-3 font-medium text-brand-forest">
                        Notice before arrival
                      </th>
                      <th className="p-3 font-medium text-brand-forest">
                        Charge
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["60 days or more", "10%"],
                      ["59 – 32 days", "25%"],
                      ["31 – 8 days", "50%"],
                      ["7 – 3 days", "75%"],
                      ["48 hours or less", "100%"],
                    ].map(([when, charge]) => (
                      <tr key={when} className="border-t border-brand-sand-dark">
                        <td className="p-3">{when}</td>
                        <td className="p-3">{charge}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Kitum Cave Safaris reserves the right to deduct all expenses
                incurred from money paid.
              </p>
              <p>
                <strong>5.3</strong> Gorilla permits and air tickets are 100%
                non-refundable.
              </p>
              <p>
                <strong>5.4</strong> No refunds will be made for any unused
                services, late arrival, or no-show of any of the members of the
                tour.
              </p>
            </div>
          </section>

          <section>
            <h2 className="heading-sub text-brand-forest mb-4">6. Complaints</h2>
            <div className="space-y-4 body-text text-sm">
              <p>
                <strong>6.1</strong> Kitum Cave Safaris shall try to ensure that
                the company exceeds expectations in every area of the tour
                arrangements. Suggestions are appreciated in order to keep
                improving the quality of the service.
              </p>
              <p>
                <strong>6.2</strong> Complaints must be reported immediately to
                the Kitum Cave Safaris representative and to the supplier of the
                service in question, who will do their best to resolve the matter.
                If the problem is not solved to the client&apos;s satisfaction,
                the complaint should be reported in writing and not later than 30
                days after completion of the tour.
              </p>
              <p>
                <strong>6.3</strong> Liability for any complaints not notified in
                accordance with the above procedure cannot be accepted.
              </p>
            </div>
          </section>

          <section>
            <h2 className="heading-sub text-brand-forest mb-4">7. Liability</h2>
            <div className="space-y-4 body-text text-sm">
              <p>
                <strong>7.1</strong> Kitum Cave Safaris will make every effort to
                ensure that all arrangements and services offered as part of the
                safari are carried out as specified in the most efficient way
                possible. However, the company does not have direct control of the
                provision of services by suppliers and, whilst every supplier is
                chosen with the utmost care, Kitum Cave Safaris does not accept
                liability for errors or omissions of such suppliers.
              </p>
              <p>
                <strong>7.2</strong> Kitum Cave Safaris shall not be liable for
                any loss, damage or injury of any nature whatsoever whether to
                person or property.
              </p>
              <p>
                <strong>7.3</strong> Whilst every care is taken, Kitum Cave
                Safaris cannot be held responsible for the direct or indirect
                costs of loss or damage to baggage or personal possessions.
              </p>
              <p>
                <strong>7.4</strong> Kitum Cave Safaris cannot accept liability or
                pay compensation for unforeseen circumstances beyond the control
                of the company or its staff, including flight delays/cancellations
                or force majeure such as war or threat of war, riots, civil
                disturbances, terrorist acts, border closure, acts of government
                or other authorities, strikes, thefts, epidemics, road closures,
                industrial disputes, natural or nuclear disaster, extreme weather
                conditions, fire, technical and/or mechanical problems to
                transport, and all similar events beyond the company&apos;s
                control.
              </p>
              <p>
                <strong>7.5</strong> It is the responsibility of the travel
                agency/wholesaler (or the traveller, where booking directly) to
                ensure that all members of the tour have the appropriate
                passports, visas, travel permits, health certificates and other
                documentation required for the safari.
              </p>
              <p>
                <strong>7.6</strong> It is the responsibility of the clients to
                take proper medical and practical precautions in regard to health
                and safety. Medical advice should be sought well before
                travelling.
              </p>
              <p>
                <strong>7.7</strong> Clients are strongly advised to obtain
                comprehensive travel insurance before coming to Uganda or other
                destinations in our itineraries. Local evacuation coverage may be
                available in the unlikely event of a medical emergency while on
                safari with Kitum Cave Safaris.
              </p>
              <p>
                <strong>7.8</strong> The respective laws of Uganda govern Kitum
                Cave Safaris&apos; liability to passengers carried in its own
                vehicles. All claims are subject to the jurisdiction of the courts
                of Uganda, unless otherwise required by applicable law.
              </p>
            </div>
          </section>

          <div className="pt-8 border-t border-brand-sand-dark space-y-4">
            <p className="body-text">
              Thank you for taking time to read these Terms &amp; Conditions.
              Your enjoyment, comfort, and safety are our priority.
            </p>
            <p className="body-text text-sm">
              Related:{" "}
              <Link href="/privacy" className="text-brand-forest underline underline-offset-2">
                Privacy Policy
              </Link>
              {" · "}
              <Link href="/contact" className="text-brand-forest underline underline-offset-2">
                Contact Us
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
