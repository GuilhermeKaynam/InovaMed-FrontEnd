export const api = {
  auth: {
    validateCredentials: async (email: string, password: string) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => 
        u.email === email && u.password === password
      );
      if (user) {
        return {
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
      return null;
    },
    registerPatient: async (data: any) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((u: any) => u.email === data.email);
      
      if (existingUser) {
        throw new Error('Email already registered');
      }

      const newUser = {
        ...data,
        id: Date.now().toString(),
        role: 'patient',
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      return newUser;
    }
  },

  appointments: {
    list: async () => {
      return JSON.parse(localStorage.getItem('appointments') || '[]');
    },
    create: async (appointmentData: any) => {
      const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const newAppointment = {
        ...appointmentData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      appointments.push(newAppointment);
      localStorage.setItem('appointments', JSON.stringify(appointments));
      return newAppointment;
    },
    delete: async (id: string, reason: string) => {
      const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const updatedAppointments = appointments.filter((app: any) => app.id !== id);
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      
      const cancelations = JSON.parse(localStorage.getItem('appointment_cancelations') || '[]');
      cancelations.push({
        appointmentId: id,
        reason,
        date: new Date().toISOString()
      });
      localStorage.setItem('appointment_cancelations', JSON.stringify(cancelations));
    }
  },

  exams: {
    list: async () => {
      return JSON.parse(localStorage.getItem('exams') || '[]');
    }
  },

  profile: {
    get: async () => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      // In a real app, we would use the current user's ID
      // For now, return the first patient found
      return users.find((u: any) => u.role === 'patient') || null;
    },
    update: async (profileData: any) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const index = users.findIndex((u: any) => u.role === 'patient');
      
      if (index !== -1) {
        users[index] = { ...users[index], ...profileData };
        localStorage.setItem('users', JSON.stringify(users));
        return users[index];
      }
      throw new Error('Profile not found');
    }
  }
};