import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const services = [
  {
    id: 1,
    title: 'Диагностика',
    description: 'Компьютерная диагностика всех систем автомобиля',
    price: 'от 1500 ₽',
    icon: 'Search',
    duration: '30-60 мин'
  },
  {
    id: 2,
    title: 'Замена масла',
    description: 'Замена моторного масла и масляного фильтра',
    price: 'от 2500 ₽',
    icon: 'Droplet',
    duration: '40 мин'
  },
  {
    id: 3,
    title: 'Шиномонтаж',
    description: 'Сезонная замена шин, балансировка колёс',
    price: 'от 2000 ₽',
    icon: 'CircleDot',
    duration: '60 мин'
  },
  {
    id: 4,
    title: 'Тормозная система',
    description: 'Диагностика и ремонт тормозов',
    price: 'от 3500 ₽',
    icon: 'AlertCircle',
    duration: '1-2 часа'
  },
  {
    id: 5,
    title: 'Подвеска',
    description: 'Ремонт и замена элементов подвески',
    price: 'от 4000 ₽',
    icon: 'Settings',
    duration: '2-4 часа'
  },
  {
    id: 6,
    title: 'Кузовной ремонт',
    description: 'Покраска, рихтовка, полировка кузова',
    price: 'от 8000 ₽',
    icon: 'Paintbrush',
    duration: 'от 1 дня'
  }
];

const gallery = [
  {
    id: 1,
    title: 'Детейлинг BMW X5',
    before: 'https://cdn.poehali.dev/projects/e1acd3ae-bc4e-4ec1-8bf7-5f42595ef1c1/files/6cd218b1-0811-4b8d-8e3f-e7ee90eeab89.jpg',
    after: 'https://cdn.poehali.dev/projects/e1acd3ae-bc4e-4ec1-8bf7-5f42595ef1c1/files/6cd218b1-0811-4b8d-8e3f-e7ee90eeab89.jpg'
  },
  {
    id: 2,
    title: 'Покраска Mercedes',
    before: 'https://cdn.poehali.dev/projects/e1acd3ae-bc4e-4ec1-8bf7-5f42595ef1c1/files/40d654ef-5788-4049-8659-c59764e47db8.jpg',
    after: 'https://cdn.poehali.dev/projects/e1acd3ae-bc4e-4ec1-8bf7-5f42595ef1c1/files/40d654ef-5788-4049-8659-c59764e47db8.jpg'
  }
];

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

export default function Index() {
  const [date, setDate] = useState<Date>();
  const [selectedService, setSelectedService] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !date || !selectedTime || !name || !phone) {
      toast.error('Заполните все поля');
      return;
    }
    toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время');
    setIsBookingOpen(false);
    setSelectedService('');
    setDate(undefined);
    setSelectedTime('');
    setName('');
    setPhone('');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Wrench" className="text-primary" size={32} />
            <h1 className="text-2xl font-bold text-white">АвтоПрофи</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-white/90 hover:text-primary transition-colors">Услуги</a>
            <a href="#prices" className="text-white/90 hover:text-primary transition-colors">Прайс</a>
            <a href="#gallery" className="text-white/90 hover:text-primary transition-colors">Галерея</a>
            <a href="#contacts" className="text-white/90 hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
                Записаться
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Онлайн-запись</DialogTitle>
                <DialogDescription>Выберите услугу, дату и время визита</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleBooking} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Услуга</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map(service => (
                        <SelectItem key={service.id} value={service.title}>
                          {service.title} - {service.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Дата</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="Calendar" className="mr-2" size={16} />
                        {date ? format(date, 'PPP', { locale: ru }) : 'Выберите дату'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        locale={ru}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Время</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите время" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(time => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Имя</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Введите ваше имя" />
                </div>
                <div className="space-y-2">
                  <Label>Телефон</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Записаться
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/e1acd3ae-bc4e-4ec1-8bf7-5f42595ef1c1/files/40d654ef-5788-4049-8659-c59764e47db8.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 to-secondary/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
          <Badge className="mb-4 bg-primary text-white px-6 py-2 text-sm">Профессиональный сервис с 2010 года</Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Автосервис нового поколения
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Современное оборудование, опытные мастера и гарантия на все работы
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6">
                  Записаться онлайн
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>
              </DialogTrigger>
            </Dialog>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20 text-lg px-8 py-6">
              <Icon name="Phone" className="mr-2" size={20} />
              +7 (999) 123-45-67
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши услуги</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Полный спектр услуг для вашего автомобиля от диагностики до кузовного ремонта
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card 
                key={service.id} 
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} className="text-primary" size={28} />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                    <Badge variant="outline">{service.duration}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="prices" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Прайс-лист</h2>
            <p className="text-lg text-muted-foreground">Прозрачные цены без скрытых платежей</p>
          </div>
          <Tabs defaultValue="maintenance" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="maintenance">Обслуживание</TabsTrigger>
              <TabsTrigger value="repair">Ремонт</TabsTrigger>
              <TabsTrigger value="body">Кузов</TabsTrigger>
            </TabsList>
            <TabsContent value="maintenance">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {[
                      { name: 'Замена масла двигателя', price: '2500 ₽' },
                      { name: 'Замена масла АКПП', price: '4500 ₽' },
                      { name: 'Замена тормозных колодок (ось)', price: '3000 ₽' },
                      { name: 'Замена воздушного фильтра', price: '800 ₽' },
                      { name: 'Замена салонного фильтра', price: '600 ₽' },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b last:border-0">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-lg font-bold text-primary">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="repair">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {[
                      { name: 'Ремонт двигателя', price: 'от 15000 ₽' },
                      { name: 'Ремонт АКПП', price: 'от 25000 ₽' },
                      { name: 'Ремонт ходовой части', price: 'от 8000 ₽' },
                      { name: 'Ремонт рулевого управления', price: 'от 6000 ₽' },
                      { name: 'Ремонт системы охлаждения', price: 'от 4000 ₽' },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b last:border-0">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-lg font-bold text-primary">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="body">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {[
                      { name: 'Покраска элемента', price: 'от 8000 ₽' },
                      { name: 'Полная покраска', price: 'от 80000 ₽' },
                      { name: 'Полировка кузова', price: 'от 12000 ₽' },
                      { name: 'Керамическое покрытие', price: 'от 25000 ₽' },
                      { name: 'Рихтовка элемента', price: 'от 5000 ₽' },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b last:border-0">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-lg font-bold text-primary">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="gallery" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Галерея работ</h2>
            <p className="text-lg text-muted-foreground">Примеры наших работ до и после</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {gallery.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">До</p>
                      <img src={item.before} alt="До" className="rounded-lg w-full h-48 object-cover" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">После</p>
                      <img src={item.after} alt="После" className="rounded-lg w-full h-48 object-cover" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h2>
            <p className="text-lg text-muted-foreground">Мы всегда на связи</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Icon name="MapPin" className="text-primary" size={24} />
                </div>
                <CardTitle>Адрес</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">г. Москва, ул. Автомобильная, д. 15</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Icon name="Phone" className="text-primary" size={24} />
                </div>
                <CardTitle>Телефон</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                <p className="text-muted-foreground">+7 (999) 765-43-21</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Icon name="Clock" className="text-primary" size={24} />
                </div>
                <CardTitle>Часы работы</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Пн-Пт: 9:00 - 20:00</p>
                <p className="text-muted-foreground">Сб-Вс: 10:00 - 18:00</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Wrench" size={24} />
            <span className="text-xl font-bold">АвтоПрофи</span>
          </div>
          <p className="text-white/70">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}
