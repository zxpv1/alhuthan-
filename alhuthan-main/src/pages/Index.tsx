import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpLeft,
  BadgeDollarSign,
  Building2,
  HeartHandshake,
  MapPin,
  Menu,
  Phone,
  Ruler,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

import logo from "@/assets/al-houtan-logo.png";
import heroImage from "@/assets/riyadh-hero-estate.jpg";
import propertyInterior from "@/assets/property-interior-suite.jpg";
import propertyVilla from "@/assets/property-villa-drive.jpg";
import propertyCommercial from "@/assets/property-commercial-lobby.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "الرئيسية", href: "#home" },
  { label: "خدماتنا", href: "#services" },
  { label: "العقارات", href: "#properties" },
  { label: "من نحن", href: "#about" },
  { label: "تواصل معنا", href: "#contact" },
];

const services = [
  {
    title: "بيع العقارات",
    description: "تسويق احترافي للعقارات السكنية والتجارية مع إبراز القيمة الحقيقية للأصل.",
    icon: BadgeDollarSign,
  },
  {
    title: "شراء العقارات",
    description: "نساعدك في اختيار الفرص الأنسب وفق الموقع والعائد والهدف الاستثماري.",
    icon: HeartHandshake,
  },
  {
    title: "إدارة الأملاك",
    description: "إدارة تشغيلية وتسويقية متكاملة ترفع الإشغال وتحافظ على جودة الأصول.",
    icon: Building2,
  },
];

const properties = [
  {
    title: "فيلا فاخرة بحي النرجس",
    price: "4.8 مليون ريال",
    location: "الرياض، حي النرجس",
    area: "620 م²",
    image: propertyVilla,
  },
  {
    title: "شقة تنفيذ راقٍ في الصحافة",
    price: "1.35 مليون ريال",
    location: "الرياض، حي الصحافة",
    area: "210 م²",
    image: propertyInterior,
  },
  {
    title: "مقر تجاري مميز",
    price: "7.2 مليون ريال",
    location: "الرياض، طريق الملك فهد",
    area: "980 م²",
    image: propertyCommercial,
  },
];

const stats = [
  { value: "+12", label: "سنة من الخبرة" },
  { value: "+350", label: "صفقة ناجحة" },
  { value: "+120", label: "أصل تحت الإدارة" },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "الاسم مطلوب").max(100, "الاسم طويل جداً"),
  phone: z
    .string()
    .trim()
    .min(8, "رقم الجوال غير مكتمل")
    .max(20, "رقم الجوال غير صالح")
    .regex(/^[+0-9\s-]+$/, "رقم الجوال يجب أن يحتوي على أرقام فقط"),
  message: z.string().trim().min(10, "اكتب تفاصيل أكثر").max(600, "الرسالة طويلة جداً"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const initialForm: ContactFormData = {
  name: "",
  phone: "",
  message: "",
};

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [formData, setFormData] = useState<ContactFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setNavHidden(currentY > lastScrollY && currentY > 96);
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  const whatsappLink = useMemo(() => {
    const sanitizedPhone = "966559175919";
    return `https://wa.me/${sanitizedPhone}`;
  }, []);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = contactSchema.safeParse(formData);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        phone: fieldErrors.phone?.[0],
        message: fieldErrors.message?.[0],
      });
      toast.error("يرجى التحقق من بيانات النموذج");
      return;
    }

    const message = encodeURIComponent(
      `مرحباً، أنا ${parsed.data.name}%0Aرقم الجوال: ${parsed.data.phone}%0Aتفاصيل الطلب: ${parsed.data.message}`,
    );

    window.open(`${whatsappLink}?text=${message}`, "_blank", "noopener,noreferrer");
    toast.success("تم تجهيز رسالتك لواتساب");
    setFormData(initialForm);
    setErrors({});
  };

  return (
    <div dir="rtl" className="min-h-screen overflow-x-hidden">
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-500",
          navHidden ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="container pt-4">
          <div className="flex items-center justify-between rounded-full border border-primary/10 bg-background/70 px-4 py-3 shadow-soft backdrop-blur-xl md:px-6">
            <a href="#home" className="flex items-center gap-3">
              <img src={logo} alt="شعار الحوتان للأستثمارات العقارية" className="h-12 w-12 rounded-full object-cover" />
              <div>
                <p className="font-display text-lg font-bold text-primary">الحوتان</p>
                <p className="text-xs text-muted-foreground">للأستثمارات العقارية</p>
              </div>
            </a>

            <nav className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary">
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <Button asChild variant="hero">
                <a href="#properties">تصفح العقارات</a>
              </Button>
            </div>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 text-primary md:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="فتح القائمة"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {menuOpen && (
            <div className="mt-3 rounded-3xl border border-primary/10 bg-card p-5 shadow-soft md:hidden">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm font-semibold text-foreground/80"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <Button asChild variant="hero">
                  <a href="#properties" onClick={() => setMenuOpen(false)}>
                    تصفح العقارات
                  </a>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main>
        <section id="home" className="relative flex min-h-[92svh] items-end overflow-hidden pt-28">
          <img
            src={heroImage}
            alt="واجهة عقار فاخر في الرياض"
            className="absolute inset-0 h-full w-full object-cover"
            width={1536}
            height={1024}
          />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="absolute inset-0 hero-sheen" />

          <div className="section-shell relative z-10 pb-16 md:pb-24">
            <div className="grid items-end gap-10 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="max-w-3xl space-y-6">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-background/10 px-4 py-2 text-sm text-secondary backdrop-blur-sm">
                  <Sparkles className="h-4 w-4" />
                  خبرة عقارية موثوقة في مدينة الرياض
                </span>
                <div className="space-y-4">
                  <h1 className="text-4xl font-extrabold leading-tight text-secondary md:text-6xl">
                    الحوتان للأستثمارات العقارية
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-secondary/85 md:text-lg">
                    نصنع تجربة عقارية راقية تجمع بين الفخامة والثقة، ونقودك نحو فرص سكنية واستثمارية مختارة بعناية داخل السوق السعودي.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button asChild size="lg" variant="hero">
                    <a href="#properties">
                      تصفح العقارات
                      <ArrowUpLeft className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="glass">
                    <a href="#contact">اطلب استشارة عقارية</a>
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-[1.5rem] border border-primary/10 bg-background/12 p-5 text-center text-secondary backdrop-blur-md">
                    <p className="font-display text-3xl font-bold md:text-4xl">{stat.value}</p>
                    <p className="mt-2 text-sm text-secondary/80">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section-band">
          <div className="section-shell">
            <div className="mb-10 flex flex-col gap-4 md:max-w-2xl">
              <span className="text-sm font-bold text-primary">خدماتنا</span>
              <h2 className="text-3xl font-bold md:text-5xl">حلول عقارية مصممة للملاك والمشترين والمستثمرين</h2>
              <p className="text-base leading-8 text-muted-foreground">
                نعمل بمنهجية دقيقة في التسويق والتفاوض وإدارة الأصول لنمنحك حضوراً أقوى وقرارات أكثر اطمئناناً.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.title} className="group rounded-[1.75rem] border border-primary/10 bg-card p-7 shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:shadow-luxury">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-line text-accent-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-primary">{service.title}</h3>
                    <p className="leading-8 text-muted-foreground">{service.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="properties" className="section-band bg-background/70">
          <div className="section-shell">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <span className="text-sm font-bold text-primary">عقارات مختارة</span>
                <h2 className="text-3xl font-bold md:text-5xl">مجموعة من الأصول السكنية والتجارية الراقية</h2>
              </div>
              <p className="max-w-xl text-base leading-8 text-muted-foreground">
                صور عالية الجودة ومعلومات واضحة عن السعر والموقع والمساحة لتسهيل التقييم الأولي واتخاذ القرار بسرعة.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {properties.map((property) => (
                <article key={property.title} className="overflow-hidden rounded-[1.75rem] border border-primary/10 bg-card shadow-soft">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                      width={1024}
                      height={768}
                    />
                    <div className="absolute inset-x-4 top-4 flex justify-end">
                      <span className="rounded-full bg-background/80 px-4 py-2 text-sm font-bold text-primary shadow-soft backdrop-blur-sm">
                        {property.price}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4 p-6">
                    <h3 className="text-2xl font-bold text-primary">{property.title}</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{property.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ruler className="h-4 w-4 text-primary" />
                        <span>{property.area}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full border-primary/20 bg-secondary/50 text-primary hover:bg-primary hover:text-primary-foreground">
                      طلب التفاصيل
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section-band">
          <div className="section-shell">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="rounded-[2rem] bg-surface-strong p-8 text-secondary shadow-luxury md:p-10">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-line text-accent-foreground">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold text-secondary md:text-4xl">من نحن</h2>
                <p className="mt-5 leading-8 text-secondary/80">
                  في الحوتان للأستثمارات العقارية نؤمن أن العقار الناجح يبدأ من فهم دقيق للسوق المحلي. لذلك بنينا حضورنا في الرياض على الثقة، الشفافية، والقدرة على قراءة الفرص الاستثمارية وتحويلها إلى قيمة مستدامة لعملائنا.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <article className="rounded-[1.5rem] border border-primary/10 bg-card p-6 shadow-soft">
                  <Users className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-3 text-xl font-bold text-primary">خبرة محلية عميقة</h3>
                  <p className="leading-8 text-muted-foreground">نمتلك معرفة دقيقة بأحياء الرياض واتجاهات العرض والطلب واحتياجات المستثمرين والمشترين.</p>
                </article>
                <article className="rounded-[1.5rem] border border-primary/10 bg-card p-6 shadow-soft">
                  <Building2 className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-3 text-xl font-bold text-primary">منتج عقاري راقٍ</h3>
                  <p className="leading-8 text-muted-foreground">ننتقي العقارات التي تجمع جودة التنفيذ، الموقع الحيوي، وإمكانات النمو على المدى الطويل.</p>
                </article>
                <article className="rounded-[1.5rem] border border-primary/10 bg-card p-6 shadow-soft sm:col-span-2">
                  <Sparkles className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-3 text-xl font-bold text-primary">تجربة عميل أنيقة وواضحة</h3>
                  <p className="leading-8 text-muted-foreground">من أول تواصل حتى إتمام الصفقة، نهتم بالتفاصيل الصغيرة التي تصنع انطباعاً احترافياً وتؤسس لعلاقة طويلة الأمد.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section-band pb-20">
          <div className="section-shell">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[2rem] bg-card p-8 shadow-soft md:p-10">
                <span className="text-sm font-bold text-primary">تواصل معنا</span>
                <h2 className="mt-3 text-3xl font-bold md:text-5xl">ابدأ رحلتك العقارية معنا</h2>
                <p className="mt-4 leading-8 text-muted-foreground">
                  سواء كنت تبحث عن شراء عقار أو إدارة أصل قائم أو تسويق فرصة استثمارية، يسعدنا خدمتك مباشرة.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <Button asChild variant="hero" size="lg">
                    <a href={whatsappLink} target="_blank" rel="noreferrer">
                      واتساب مباشر
                      <Send className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href="tel:+966559175919">
                      اتصال مباشر
                      <Phone className="h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <a
                  href="https://maps.app.goo.gl/pM14BVvf2vztbHzq9"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 block rounded-[1.5rem] border border-primary/10 bg-secondary/40 p-6 transition-colors hover:border-primary/30 hover:bg-secondary/60"
                >
                  <p className="text-sm font-bold text-primary">موقعنا</p>
                  <p className="mt-2 leading-8 text-muted-foreground">الرياض، مخطط الخير</p>
                </a>
              </div>

              <form onSubmit={handleSubmit} className="rounded-[2rem] border border-primary/10 bg-background/85 p-8 shadow-soft backdrop-blur-sm md:p-10" noValidate>
                <div className="grid gap-5">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-bold text-primary">الاسم</label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(event) => handleChange("name", event.target.value)}
                      placeholder="اكتب اسمك الكامل"
                      className="h-12 border-primary/15 bg-card"
                    />
                    {errors.name ? <p className="text-sm text-destructive">{errors.name}</p> : null}
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="phone" className="text-sm font-bold text-primary">رقم الجوال</label>
                    <Input
                      id="phone"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={(event) => handleChange("phone", event.target.value)}
                      placeholder="05XXXXXXXX"
                      className="h-12 border-primary/15 bg-card"
                    />
                    {errors.phone ? <p className="text-sm text-destructive">{errors.phone}</p> : null}
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="message" className="text-sm font-bold text-primary">تفاصيل الطلب</label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(event) => handleChange("message", event.target.value)}
                      placeholder="اذكر نوع العقار أو الخدمة المطلوبة"
                      className="min-h-36 border-primary/15 bg-card"
                    />
                    {errors.message ? <p className="text-sm text-destructive">{errors.message}</p> : null}
                  </div>

                  <Button type="submit" size="lg" variant="hero">
                    إرسال عبر واتساب
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
