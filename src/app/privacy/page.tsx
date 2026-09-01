import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/packages";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Kitum Cave Safaris Limited collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="section-padding section-spacing pt-28 md:pt-36">
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <h1 className="heading-display text-brand-forest mb-4">Privacy Policy</h1>
            <p className="body-large">
              Kitum Cave Safaris Limited (&ldquo;Kitum Cave Safaris&rdquo;) operates{" "}
              {siteConfig.url.replace(/^https?:\/\//, "")} and may operate other
              websites. It is our policy to respect your privacy regarding any
              information we may collect while operating our websites.
            </p>
          </div>
          <section>
            <h2 className="heading-sub text-brand-forest mb-4">Cookies</h2>
            <p className="body-text text-sm">
              A cookie is a string of information that a website stores on a
              visitor&apos;s computer, and that the visitor&apos;s browser
              provides to the website each time the visitor returns. Kitum Cave
              Safaris may use cookies to help identify and track visitors, their
              usage of our website, and their website access preferences. Visitors
              who do not wish to have cookies placed on their computers should set
              their browsers to refuse cookies before using our websites, with the
              drawback that certain features of our websites may not function
              properly without the aid of cookies.
            </p>
          </section>

          <section>
            <h2 className="heading-sub text-brand-forest mb-4">
              Payment Processing
            </h2>
            <p className="body-text text-sm">
              Online payments are processed by third-party payment providers (such
              as Flutterwave). Those providers may collect and process payment
              information under their own privacy policies. Kitum Cave Safaris does
              not store full card numbers on this website.
            </p>
          </section>

          <section>
            <h2 className="heading-sub text-brand-forest mb-4">
              Gathering of Personally-Identifying Information
            </h2>
            <div className="space-y-4 body-text text-sm">
              <p>
                Certain visitors to Kitum Cave Safaris&apos; websites choose to
                interact with us in ways that require us to gather
                personally-identifying information. The amount and type of
                information that we gather depends on the nature of the
                interaction. For example, we may ask visitors who inquire about a
                trip or create a booking to provide a name, email address, phone
                number, travel dates, and passport details needed for permits. Those
                who engage in transactions with Kitum Cave Safaris are asked to
                provide additional information, including as necessary the personal
                and payment information required to process those transactions
                (payment card details are processed by our payment partner and are
                not stored on our public website).
              </p>
              <p>
                In each case, Kitum Cave Safaris collects such information only
                insofar as is necessary or appropriate to fulfil the purpose of
                the visitor&apos;s interaction with us. We do not disclose
                personally-identifying information other than as described below.
                Visitors can always refuse to supply personally-identifying
                information, with the caveat that it may prevent them from
                engaging in certain website-related activities (such as booking or
                submitting an inquiry).
              </p>
            </div>
          </section>

          <section>
            <h2 className="heading-sub text-brand-forest mb-4">
              Protection of Certain Personally-Identifying Information
            </h2>
            <div className="space-y-4 body-text text-sm">
              <p>
                Kitum Cave Safaris discloses potentially personally-identifying
                and personally-identifying information only to those of its
                employees, contractors and affiliated organisations that (i) need
                to know that information in order to process it on our behalf or
                to provide services available at our websites, and (ii) that have
                agreed not to disclose it to others. Some of those employees,
                contractors and affiliated organisations may be located outside of
                your home country; by using our websites, you consent to the
                transfer of such information to them.
              </p>
              <p>
                Kitum Cave Safaris will not rent or sell potentially
                personally-identifying and personally-identifying information to
                anyone. Other than to its employees, contractors and affiliated
                organisations, as described above, we disclose potentially
                personally-identifying and personally-identifying information only
                in response to a subpoena, court order or other governmental
                request, or when we believe in good faith that disclosure is
                reasonably necessary to protect the property or rights of Kitum
                Cave Safaris, third parties or the public at large.
              </p>
              <p>
                If you have supplied your email address, we may occasionally send
                you an email to tell you about new features, solicit your feedback,
                or keep you up to date with Kitum Cave Safaris. If you send us a
                request (for example via email, WhatsApp, or a contact form), we
                reserve the right to use it to clarify or respond to your request
                or to help us support other travellers. Kitum Cave Safaris takes
                all measures reasonably necessary to protect against the
                unauthorised access, use, alteration or destruction of potentially
                personally-identifying and personally-identifying information.
              </p>
            </div>
          </section>

          <section>
            <h2 className="heading-sub text-brand-forest mb-4">
              Website Visitors
            </h2>
            <div className="space-y-4 body-text text-sm">
              <p>
                Like most website operators, Kitum Cave Safaris collects
                non-personally-identifying information of the sort that web
                browsers and servers typically make available, such as the
                browser type, language preference, referring site, and the date
                and time of each visitor request. Our purpose in collecting
                non-personally-identifying information is to better understand how
                visitors use our website. From time to time, we may release
                non-personally-identifying information in the aggregate, e.g., by
                publishing a report on trends in the usage of our website.
              </p>
              <p>
                Kitum Cave Safaris may also collect potentially
                personally-identifying information like Internet Protocol (IP)
                addresses for users who submit forms, leave reviews, or otherwise
                interact with the site in a logged or identifiable way. We only
                disclose such information under the same circumstances that we use
                and disclose personally-identifying information as described
                below.
              </p>
            </div>
          </section>

          <section>
            <h2 className="heading-sub text-brand-forest mb-4">
              Aggregated Statistics
            </h2>
            <p className="body-text text-sm">
              Kitum Cave Safaris may collect statistics about the behaviour of
              visitors to its websites. We may display this information publicly
              or provide it to others. However, we do not disclose
              personally-identifying information other than as described below.
            </p>
          </section>

          <section>
            <h2 className="heading-sub text-brand-forest mb-4">
              Business Transfers
            </h2>
            <p className="body-text text-sm">
              If Kitum Cave Safaris, or substantially all of its assets, were
              acquired, or in the unlikely event that the company goes out of
              business or enters bankruptcy, user information would be one of the
              assets that is transferred or acquired by a third party. You
              acknowledge that such transfers may occur, and that any acquirer of
              Kitum Cave Safaris may continue to use your personal information as
              set forth in this policy.
            </p>
          </section>

          <section>
            <h2 className="heading-sub text-brand-forest mb-4">Contact</h2>
            <p className="body-text text-sm">
              For privacy-related questions, contact Kitum Cave Safaris at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-brand-forest underline underline-offset-2"
              >
                {siteConfig.email}
              </a>
              , phone{" "}
              <a
                href={`tel:${siteConfig.phone}`}
                className="text-brand-forest underline underline-offset-2"
              >
                {siteConfig.phone}
              </a>
              , or visit us at {siteConfig.address}.
            </p>
          </section>

          <section>
            <h2 className="heading-sub text-brand-forest mb-4">
              Privacy Policy Changes
            </h2>
            <p className="body-text text-sm">
              Although most changes are likely to be minor, Kitum Cave Safaris may
              change this Privacy Policy from time to time, in its sole
              discretion. We encourage visitors to check this page for any
              changes. Your continued use of this site after any change in this
              Privacy Policy will constitute your acceptance of such change.
            </p>
          </section>

          <div className="pt-8 border-t border-brand-sand-dark">
            <p className="body-text text-sm">
              Related:{" "}
              <Link
                href="/contact"
                className="text-brand-forest underline underline-offset-2"
              >
                Contact Us
              </Link>
              {" · "}
              <Link
                href="/terms"
                className="text-brand-forest underline underline-offset-2"
              >
                Terms &amp; Conditions
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
