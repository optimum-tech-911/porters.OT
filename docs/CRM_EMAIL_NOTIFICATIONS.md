# CRM email alerts

The public contact, appointment, candidate, and simulator forms save each inquiry to `public.crm_inquiries` first. After a successful save, the browser sends a short notification through [FormSubmit](https://formsubmit.co/ajax-documentation) to `a.lambert@porters.fr`. The email contains only the request type and a link to `/admin/messages` or `/admin/leads`; the visitor's name, email, message, and simulation data stay in the existing CRM.

This adds no Supabase Edge Function, trigger, scheduled job, or paid mail provider. The normal CRM insert still uses the existing Supabase project and its quota. FormSubmit says its form delivery is free, but its first submission sends an activation email to the recipient. **A. Lambert must click that activation link before notification emails can arrive.** The first real submission after the website is deployed will trigger it. FormSubmit says it retains submissions made before activation for 30 days.

Email delivery is best effort: if FormSubmit, the visitor's browser, or the network blocks the second request, the inquiry remains in the admin panel but there is no automatic email retry. The page reports success once the CRM save succeeds, even if the email alert fails. Check the admin inbox for all requests.

The chatbot is a local search assistant and does not create CRM inquiries. Email links open the user's own mail app and are outside these website forms.
