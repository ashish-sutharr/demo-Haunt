// Sample data entries
const posts = [
    {
      name: "John Doe",
      username: "johndoe",
      description: "Enjoying a sunny day!",
      image: {
        url: "https://plus.unsplash.com/premium_photo-1711387452192-3c3d949f93a8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        filename: "image1.jpg"
      },
      likes: 25,
      createdAt: new Date("2024-04-28")
    },
    {
      name: "Jane Smith",
      username: "janesmith",
      description: "Exploring new places.",
      image: {
        url: "https://images.unsplash.com/photo-1527082395-e939b847da0d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        filename: "image2.jpg"  
      },
      likes: 30,
      createdAt: new Date("2024-04-27")
    },
    {
      name: "Alex Johnson",
      username: "alexj",
      description: "Trying out new recipes.",
      image: {
        url: "https://images.unsplash.com/photo-1606122017369-d782bbb78f32?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        filename: "image3.jpg"
      },
      likes: 15,
      createdAt: new Date("2024-04-26")
    },
    {
      name: "Sarah Brown",
      username: "sarahb",
      description: "Adventures with friends.",
      image: {
        url: "https://plus.unsplash.com/premium_photo-1710695570402-83df3571880b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        filename: "image4.jpg"
      },
      likes: 40,
      createdAt: new Date("2024-04-25")
    },
    {
      name: "Mike Taylor",
      username: "miket",
      description: "Nature walks.",
      image: {
        url: "https://images.unsplash.com/photo-1629747490241-624f07d70e1e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        filename: "image5.jpg"
      },
      likes: 20,
      createdAt: new Date("2024-04-24")
    },
    {
      name: "Ella Martinez",
      username: "ellam",
      description: "Relaxing by the beach.",
      image: {
        url: "https://images.unsplash.com/photo-1485463598028-44d6c47bf23f?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        filename: "image6.jpg"
      },
      likes: 35,
      createdAt: new Date("2024-04-23")
    },
    {
      name: "David Lee",
      username: "davidl",
      description: "Family time.",
      image: {
        url: "https://images.unsplash.com/photo-1572631382901-cf1a0a6087cb?q=80&w=1882&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        filename: "image7.jpg"
      },
      likes: 18,
      createdAt: new Date("2024-04-22")
    },
    {
      name: "Sophie White",
      username: "sophiew",
      description: "Exploring art galleries.",
      image: {
        url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        filename: "image8.jpg"
      },
      likes: 28,
      createdAt: new Date("2024-04-21")
    },
    {
      name: "Chris Adams",
      username: "chrisa",
      description: "Hiking in the mountains.",
      image: {
        url: "https://images.unsplash.com/photo-1572631382901-cf1a0a6087cb?q=80&w=1882&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        filename: "image9.jpg"
      },
      likes: 22,
      createdAt: new Date("2024-04-20")
    },
    {
      name: "Lisa Wong",
      username: "lisaw",
      description: "Cooking experiments.",
      image: {
        url: "https://images.unsplash.com/photo-1605949405965-d49ada3f9189?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        filename: "image10.jpg"
      },
      likes: 32,
      createdAt: new Date("2024-04-19")
    }
  ];
  
  module.exports = { data: posts };