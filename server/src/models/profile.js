import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String 
  },
  picture: { 
    type: String 
  },
  
   title: { 
    type: String, 
    default: 'Software Engineer' 
  },
  location: { 
    type: String, 
    default: 'San Francisco, CA' 
  },
  about: { 
    type: String, 
    default: 'Passionate professional with expertise in technology.' 
  },
  phone: { 
    type: String, 
    default: '' 
  },
  website: { 
    type: String, 
    default: '' 
  },
  linkedin: { 
    type: String, 
    default: '' 
  },
  github: { 
    type: String, 
    default: '' 
  },
  
   avatar: { 
    type: String, 
    default: '' 
  },
  coverPhoto: { 
    type: String, 
    default: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=300&fit=crop' 
  },
  
   skills: [{ 
    type: String 
  }],
  
   experience: [{
    id: { 
      type: Number 
    },
    title: { 
      type: String 
    },
    company: { 
      type: String 
    },
    location: { 
      type: String 
    },
    startDate: { 
      type: String 
    },
    endDate: { 
      type: String 
    },
    description: { 
      type: String 
    }
  }],
  
   education: [{
    id: { 
      type: Number 
    },
    degree: { 
      type: String 
    },
    school: { 
      type: String 
    },
    location: { 
      type: String 
    },
    startDate: { 
      type: String 
    },
    endDate: { 
      type: String 
    },
    description: { 
      type: String 
    }
  }],
  
   createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true  
});

export default mongoose.model("User", UserSchema);