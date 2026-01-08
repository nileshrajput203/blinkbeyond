const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&auto=format&fit=crop')`,
        }}
      />
    </section>
  );
};

export default Hero;
