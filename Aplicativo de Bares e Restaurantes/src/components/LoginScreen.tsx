import { useState } from 'react';
import { Beer, Mail, Lock, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import logo from 'figma:asset/110401e48911992189bdf3d5550ecdeaf758835d.png';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center p-4 w-full">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-full mb-4 shadow-lg p-4">
            <img src={logo} alt="Deu Fila Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-white mb-2">Deu Fila</h1>
          <p className="text-amber-100 text-sm sm:text-base">Descubra os melhores bares e restaurantes</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
          <div className="flex gap-2 mb-6">
            <Button
              type="button"
              variant={!isSignUp ? 'default' : 'outline'}
              className={`flex-1 ${!isSignUp ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
              onClick={() => setIsSignUp(false)}
            >
              Entrar
            </Button>
            <Button
              type="button"
              variant={isSignUp ? 'default' : 'outline'}
              className={`flex-1 ${isSignUp ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
              onClick={() => setIsSignUp(true)}
            >
              Cadastrar
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              {isSignUp ? 'Criar conta' : 'Entrar'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}