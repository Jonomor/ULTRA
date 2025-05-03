export default function VideoSection() {
  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-crimson mb-12 glow">
          See ULTRA In Action
        </h2>

        <video
          autoPlay
          muted
          loop
          playsInline
          className="rounded-xl mx-auto shadow-lg max-w-full"
        >
<source src="/videos/ultra_system_demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
