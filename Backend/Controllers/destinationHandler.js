import Destination from "../Models/destination.js";
export async function getAllDestinationsHandler(req, res) {
  const allDestinations = await Destination.find({});
  return res.json(allDestinations);
}

export async function getRecentDestinationsHandler(req, res) {
  try {
    const allDestinations = await Destination.find()
      .limit(6)
      .sort({ createdAt: -1 }); // Optional: sort by newest
    return res.json(allDestinations);
  } catch (err) {
    console.error("Error fetching destinations:", err);
    return res
      .status(500)
      .json({ error: "Server error while fetching destinations" });
  }
}

export async function updateDestinationsHandler(req, res) {
  try {
    const id = req.params.id;
    const {
      name,
      location,
      description,
      whatsappGroupLink,
      duration,
      price,
      transportMode,
      oldImages,
      status,
    } = req.body;

    // Basic validation
    if (!name || !location) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name or location" });
    }

    // Parse trip dates
    let dates = [];
    if (req.body.dates) {
      try {
        dates = JSON.parse(req.body.dates);
        if (!Array.isArray(dates)) throw new Error();
      } catch {
        return res.status(400).json({ error: "Invalid dates format" });
      }
    }

    // Parse existing images from req.body
    let existingImages = [];
    if (oldImages) {
      try {
        console.log(oldImages);
        existingImages = JSON.parse(oldImages);
        if (!Array.isArray(existingImages)) throw new Error();
      } catch {
        return res.status(400).json({ error: "Invalid images format" });
      }
    }
    console.log("Existing: ", existingImages);
    // Handle new images from req.files
    const newImages = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));

    // Combine old and new images
    const allImages = [...existingImages, ...newImages];
    console.log("all: ", allImages);
    // Perform update
    const updatedDestination = await Destination.findByIdAndUpdate(
      id,
      {
        name,
        location,
        description,
        whatsappGroupLink,
        duration,
        price: parseFloat(price),
        transportMode,
        dates,
        images: allImages,
        status,
      },
      { new: true } // Return the updated document
    );

    console.log("Destination updated:", updatedDestination);
    return res.status(200).json({ msg: "success", data: updatedDestination });
  } catch (err) {
    console.error("Error Updating Destination:", err);
    return res
      .status(500)
      .json({ error: "Server error while updating destination" });
  }
}

export async function deleteDestinationHandler(req, res) {
  try {
    const id = req.params.id;
    const deleteDest = await Destination.findByIdAndDelete(id);
    console.log("destination deleted", deleteDest);
    return res.status(200).json({ msg: "success" });
  } catch {
    console.log("Error Deleting Destinations: ", err);
    return res
      .status(500)
      .json({ error: "Server error while deleting destinations" });
  }
}

export async function addDestinationHandler(req, res) {
  try {
    const {
      name,
      location,
      description,
      whatsappGroupLink,
      duration,
      price,
      transportMode,
      status,
    } = req.body;

    if (!name || !location) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name or location" });
    }

    // Parse JSON stringified 'dates' array
    let dates = [];
    if (req.body.dates) {
      try {
        dates = JSON.parse(req.body.dates);
        if (!Array.isArray(dates)) throw new Error();
      } catch {
        return res.status(400).json({ error: "Invalid dates format" });
      }
    }

    // Handle uploaded images from Multer (Cloudinary file info)
    const images = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));

    const newDestination = await Destination.create({
      name,
      location,
      description,
      whatsappGroupLink,
      duration,
      price: parseFloat(price),
      transportMode,
      status: status || "available",
      dates,
      images,
      status,
    });

    console.log("Destination created:", newDestination);
    return res.status(200).json({ msg: "success", data: newDestination });
  } catch (err) {
    console.error("Error in addDestinationHandler:", err);
    return res
      .status(500)
      .json({ error: "Server error while adding destination" });
  }
}
