import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { SEO } from '../../components/Shared/SEO';

const Login: React.FC = () => {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data: any) => {
    // Mock Authentication Logic
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (data.username === 'admin' && data.password === '123456') {
      login('demo-token');
      navigate('/admin');
    } else {
      setError('root', { type: 'manual', message: '用户名或密码错误 (试用: admin / 123456)' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <SEO title="后台登录" />
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">管理后台登录</h1>
            <p className="text-gray-500 text-sm">西安市慈善会</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {errors.root && (
            <div className="bg-red-50 text-red-500 text-sm p-3 rounded border border-red-100">
              {errors.root.message as string}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <input 
              {...register('username', { required: '请输入用户名' })}
              type="text" 
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
              placeholder="admin"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message as string}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input 
              {...register('password', { required: '请输入密码' })}
              type="password" 
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
              placeholder="123456"
            />
             {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message as string}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition-colors disabled:opacity-50"
          >
            {isSubmitting ? '登录中...' : '登 录'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;