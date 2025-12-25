  import mongoose from 'mongoose';
  import dotenv from 'dotenv';
  import bcrypt from 'bcryptjs';
  import { connectDB } from '../config/database.js';
  import User from '../models/User.js';
  import Team from '../models/Team.js';
  import Player from '../models/Player.js';
  import News from '../models/News.js';
  import Job from '../models/Job.js';
  import Product from '../models/Product.js';
  import Sponsor from '../models/Sponsor.js';
  import Management from '../models/Management.js';
  import Match from '../models/Match.js';
  import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '../.env') }); 

  console.log("MONGO_URI =", process.env.MONGODB_URI);

  const seedDatabase = async () => {
    try {
      await connectDB();

      // Clear existing data
      console.log('🗑️  Clearing existing data...');
      await User.deleteMany({});
      await Team.deleteMany({});
      await Player.deleteMany({});
      await News.deleteMany({});
      await Job.deleteMany({});
      await Product.deleteMany({});
      await Sponsor.deleteMany({});
      await Management.deleteMany({});
      await Match.deleteMany({});

      // Create admin user
      console.log('👤 Creating admin user...');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const adminUser = await User.create({
        email: 'admin@nexusventus.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin'
      });

      // Create players
      console.log('🎮 Creating players...');
      const players = await Player.insertMany([
        { slug: 'phoenix', name: 'Phoenix', realName: 'John Doe', role: 'Duelist', photo: '/placeholder.svg', country: 'USA', socialLinks: { twitter: '#', twitch: '#' }, joinDate: new Date('2023-01-15'), type: 'player' },
        { slug: 'sage', name: 'Sage', realName: 'Jane Smith', role: 'Sentinel', photo: '/placeholder.svg', country: 'Canada', socialLinks: { twitter: '#', twitch: '#' }, joinDate: new Date('2023-02-20'), type: 'player' },
        { slug: 'jett', name: 'Jett', realName: 'Mike Johnson', role: 'Duelist', photo: '/placeholder.svg', country: 'UK', socialLinks: { twitter: '#', twitch: '#' }, joinDate: new Date('2023-03-10'), type: 'player' },
        { slug: 'omen', name: 'Omen', realName: 'Chris Lee', role: 'Controller', photo: '/placeholder.svg', country: 'Germany', socialLinks: { twitter: '#', twitch: '#' }, joinDate: new Date('2023-04-05'), type: 'player' },
        { slug: 'sova', name: 'Sova', realName: 'Alex Kim', role: 'Initiator', photo: '/placeholder.svg', country: 'Sweden', socialLinks: { twitter: '#', twitch: '#' }, joinDate: new Date('2023-05-12'), type: 'player' },
      ]);

      // Create team
      console.log('🏆 Creating teams...');
      const valorantTeam = await Team.create({
        slug: 'valorant',
        name: 'Team Aventus Valorant',
        game: 'VALORANT',
        gameCategory: 'FPS',
        logo: '/placeholder.svg',
        banner: '/placeholder.svg',
        description: 'Our VALORANT roster competes at the highest level, showcasing tactical excellence and mechanical prowess.',
        isActive: true,
        achievements: ['VCT Challengers 2024 - 1st Place', 'Regional Finals Champion', 'Community Cup Winner'],
        roster: players.map(p => p._id)
      });

      // Update players with team reference
      await Player.updateMany(
        { _id: { $in: players.map(p => p._id) } },
        { teamId: valorantTeam._id }
      );

      // Create matches
      console.log('⚔️  Creating matches...');
      await Match.insertMany([
        {
          slug: 'match-vs-rival-esports',
          opponent: 'Rival Esports',
          opponentLogo: '/placeholder.svg',
          date: new Date('2024-01-20'),
          tournament: 'VCT Challengers',
          result: 'win',
          score: '13-7',
          teamId: valorantTeam._id
        },
        {
          slug: 'match-vs-phoenix-gaming',
          opponent: 'Phoenix Gaming',
          opponentLogo: '/placeholder.svg',
          date: new Date('2024-01-15'),
          tournament: 'VCT Challengers',
          result: 'win',
          score: '13-11',
          teamId: valorantTeam._id
        }
      ]);

      // Create news
      console.log('📰 Creating news articles...');
      await News.insertMany([
        {
          slug: 'team-aventus-wins-vct-challengers',
          title: 'Team Aventus Wins VCT Challengers 2024',
          excerpt: 'Our VALORANT roster dominates the competition to claim the championship title.',
          content: '<p>In an electrifying grand finals match, Team Aventus emerged victorious against Rival Esports to claim the VCT Challengers 2024 championship.</p>',
          thumbnail: '/placeholder.svg',
          featuredImage: '/placeholder.svg',
          category: 'Tournament',
          author: 'Admin',
          publishedAt: new Date('2024-01-21'),
          tags: ['VALORANT', 'VCT', 'Championship'],
          isPublished: true
        },
        {
          slug: 'new-partnership-announcement',
          title: 'Team Aventus Announces New Partnership with TechGear',
          excerpt: 'Exciting new sponsorship deal brings premium gaming peripherals to our players.',
          content: '<p>We are thrilled to announce our partnership with TechGear, a leading manufacturer of gaming peripherals.</p>',
          thumbnail: '/placeholder.svg',
          featuredImage: '/placeholder.svg',
          category: 'Announcement',
          author: 'Admin',
          publishedAt: new Date('2024-01-18'),
          tags: ['Partnership', 'Sponsorship'],
          isPublished: true
        }
      ]);

      // Create jobs
      console.log('💼 Creating job postings...');
      await Job.insertMany([
        {
          slug: 'social-media-manager',
          title: 'Social Media Manager',
          type: 'staff',
          department: 'Marketing',
          location: 'Remote',
          isRemote: true,
          description: 'Manage and grow our social media presence across all platforms.',
          requirements: ['2+ years social media experience', 'Knowledge of esports industry', 'Strong communication skills'],
          responsibilities: ['Create engaging content', 'Manage posting schedule', 'Engage with community'],
          postedAt: new Date('2024-01-15'),
          isActive: true
        },
        {
          slug: 'valorant-player-tryouts',
          title: 'VALORANT Player - Tryouts Open',
          type: 'player',
          department: 'Competitive',
          location: 'EU Region',
          isRemote: false,
          description: 'Looking for talented VALORANT players to join our roster.',
          requirements: ['Immortal+ rank', 'Tournament experience', 'Team player mentality'],
          responsibilities: ['Compete in tournaments', 'Practice with team', 'Represent the organization'],
          postedAt: new Date('2024-01-20'),
          isActive: true
        }
      ]);

      // Create products
      console.log('🛍️  Creating products...');
      await Product.insertMany([
        {
          slug: 'team-jersey-2024',
          name: 'Official Team Jersey 2024',
          price: 79.99,
          image: '/placeholder.svg',
          category: 'Apparel',
          description: 'Premium esports jersey with breathable fabric.',
          inStock: true,
          stock: 50,
          featured: true
        },
        {
          slug: 'team-hoodie-black',
          name: 'Team Hoodie - Black',
          price: 59.99,
          image: '/placeholder.svg',
          category: 'Apparel',
          description: 'Comfortable hoodie with embroidered logo.',
          inStock: true,
          stock: 30,
          featured: true
        },
        {
          slug: 'mousepad-xl',
          name: 'Gaming Mousepad XL',
          price: 34.99,
          image: '/placeholder.svg',
          category: 'Gear',
          description: 'Extended mousepad with team design.',
          inStock: false,
          stock: 0,
          featured: false
        }
      ]);

      // Create sponsors
      console.log('🤝 Creating sponsors...');
      await Sponsor.insertMany([
        { name: 'TechGear', logo: '/placeholder.svg', url: '#', tier: 'main', isActive: true },
        { name: 'GameFuel', logo: '/placeholder.svg', url: '#', tier: 'main', isActive: true },
        { name: 'StreamPro', logo: '/placeholder.svg', url: '#', tier: 'partner', isActive: true },
        { name: 'ChairMax', logo: '/placeholder.svg', url: '#', tier: 'partner', isActive: true }
      ]);

      // Create management
      console.log('👔 Creating management team...');
      await Management.insertMany([
        {
          name: 'Alex Martinez',
          role: 'CEO & Founder',
          photo: '/placeholder.svg',
          bio: 'Visionary leader with 10+ years in esports industry.',
          socialLinks: { twitter: '#', linkedin: '#' },
          order: 1,
          isActive: true
        },
        {
          name: 'Sarah Chen',
          role: 'COO',
          photo: '/placeholder.svg',
          bio: 'Operations expert ensuring smooth team management.',
          socialLinks: { twitter: '#', linkedin: '#' },
          order: 2,
          isActive: true
        }
      ]);

      console.log('✅ Database seeded successfully!');
      console.log('\n📝 Admin Credentials:');
      console.log('   Email: admin@nexusventus.com');
      console.log('   Password: admin123');
      console.log('\n🎉 You can now start the server and use the API!');

      process.exit(0);
    } catch (error) {
      console.error('❌ Error seeding database:', error);
      process.exit(1);
    }
  };

  seedDatabase();

