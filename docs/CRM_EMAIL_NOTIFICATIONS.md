# CRM email alerts

The public contact, appointment, candidate, and simulator forms save each inquiry to `public.crm_inquiries` first. After a successful save, the browser sends a short notification through [FormSubmit](https://formsubmit.co/ajax-documentation) to `a.lambert@porters.fr`. The email contains only the request type and a link to `/admin/messages` or `/admin/leads`; the visitor's name, email, message, and simulation data stay in the existing CRM.

This adds no Supabase Edge Function, trigger, scheduled job, or paid mail provider. The normal CRM insert still uses the existing Supabase project and its quota. FormSubmit says its form delivery is free. **A. Lambert must click the “Activate Form” link in her confirmation email before notification emails can arrive.** All request forms use the same FormSubmit form URL, `https://www.porters.fr/`, so they share that activation.

On 1 October 2026, an activation request was submitted directly to `https://formsubmit.co/ajax/a.lambert@porters.fr` using that form URL. FormSubmit returned HTTP 200 with `success: "false"` and explicitly stated that it had sent an email containing an “Activate Form” link. This confirms the service accepted the activation request; it does not confirm mailbox delivery or that the recipient has clicked the link. FormSubmit says it retains submissions made before activation for 30 days.

After the recipient reported activation, a subsequent check on 1 October confirmed that an anonymous CRM insert with a four-character message was rejected by the insert policy, while a valid, clearly labelled test inquiry was saved with HTTP 201. Its email alert was accepted by FormSubmit with HTTP 200, `success: "true"`, and “The form was submitted successfully.” One test inquiry named `TEST notification The Porters` is retained in the admin messages panel and can be archived. Recipient inbox delivery has not been independently checked.

To repeat a form test, reload the updated contact page, enter a name of at least two characters, use a message such as `Test de notification email` (at least five characters after trimming), complete the required choices and consent, and submit once. Confirm the success message, the new inquiry in `/admin/messages`, and the email in the recipient's inbox. The forms now validate trimmed name and message lengths before contacting Supabase. Publish the updated site code before repeating the test on the production domain.

Email delivery is best effort: if FormSubmit, the visitor's browser, or the network blocks the second request, the inquiry remains in the admin panel but there is no automatic email retry. The page reports success once the CRM save succeeds, even if the email alert fails. Check the admin inbox for all requests.

The chatbot is a local search assistant and does not create CRM inquiries. Email links open the user's own mail app and are outside these website forms.
