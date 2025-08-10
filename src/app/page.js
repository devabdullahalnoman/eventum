import Image from "next/image";

export default function Home() {
  return <div></div>;
}


// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";

// export default function HomePage() {
//   return (
//     <main className="space-y-16">
//       <section className="grid md:grid-cols-2 gap-8 items-center">
//         <div>
//           <h1 className="text-4xl font-bold mb-4">Discover events that move you.</h1>
//           <p className="text-gray-600 mb-6">Workshops, meetups, concerts — all in one place.</p>
//           <a href="/events" className="btn btn-primary">Explore Events</a>
//         </div>
//         <img src="/assets/images/hero.png" alt="Eventum" className="rounded-lg shadow" />
//       </section>

//       <section className="grid md:grid-cols-3 gap-6">
//         {[1,2,3].map((i) => (
//           <Card key={i}>
//             <h3 className="font-semibold mb-2">Featured Event {i}</h3>
//             <p className="text-sm text-gray-600">Inspiring sessions and great people.</p>
//           </Card>
//         ))}
//       </section>

//       <section className="grid md:grid-cols-3 gap-6">
//         {["Discover","Register","Attend"].map((t) => (
//           <Card key={t}>
//             <h4 className="font-semibold mb-2">{t}</h4>
//             <p className="text-sm text-gray-600">Simple steps to get started.</p>
//           </Card>
//         ))}
//       </section>

//       <section className="grid md:grid-cols-4 gap-6">
//         {["Curated Events","Secure Auth","Responsive UI","Fast Loading"].map((t) => (
//           <Card key={t}>
//             <h4 className="font-semibold mb-2">{t}</h4>
//             <p className="text-sm text-gray-600">Built with Next.js App Router.</p>
//           </Card>
//         ))}
//       </section>

//       <section className="grid md:grid-cols-2 gap-6">
//         {[1,2].map((i) => (
//           <Card key={i}>
//             <p>"Eventum made my meetup a success."</p>
//             <p className="mt-2 text-sm text-gray-600">— Happy Organizer</p>
//           </Card>
//         ))}
//       </section>

//       <section className="space-y-3">
//         {["How do I register?","Is there a fee?","Can I host?"].map((q) => (
//           <details key={q} className="collapse bg-base-200">
//             <summary className="collapse-title text-lg font-medium">{q}</summary>
//             <div className="collapse-content">
//               <p>Yes — it’s simple and quick with Eventum.</p>
//             </div>
//           </details>
//         ))}
//       </section>

//       <section className="text-center">
//         <Button asChild><a href="/events">Browse Events</a></Button>
//       </section>
//     </main>
//   );
// }
