import SelectCountry from "../_components/SelectCountry";
import UpdateProfileForm from "../_components/UpdateProfileForm";
import { auth } from "../_lib/auth";
import { getGuest } from "../_lib/data-service";

export const metadata = {
  title: "Account",
};

export default async function Page() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Session or user email is missing");
  }

  const guest = await getGuest(session.user.email);

  return (
    <main className="bg-primary-900 rounded-md mx-6 pt-6 pb-8 flex flex-col justify-start items-center gap-6 mb-6">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-3xl font-semibold">User profile</h2>
        <p>
          Providing the following information will make it easier to make a
          reservation.
        </p>
      </div>
      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          defaultCountry={guest.nationality}
          className="w-[520px] bg-accent-50 text-gray-900"
        />
      </UpdateProfileForm>
    </main>
  );
}
