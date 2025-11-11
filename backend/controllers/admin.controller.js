import User from '../models/user.model.js';
import Checklist from '../models/checklist.model.js';
import Itinerary from '../models/itinerary.model.js';
import WeddingDetails from '../models/weddingdetails.model.js';
import Contact from '../models/contact.model.js';

// Get all data from all collections
export const getAllData = async (req, res) => {
  try {
    const [users, checklists, itineraries, weddingDetails, contacts] = await Promise.all([
      User.find().select('-password'), // Exclude passwords
      Checklist.find(),
      Itinerary.find(),
      WeddingDetails.find(),
      Contact.find()
    ]);

    res.json({
      users,
      checklists,
      itineraries,
      weddingDetails,
      contacts
    });
  } catch (error) {
    console.error('Error fetching all data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

// Delete a document from any collection
export const deleteDocument = async (req, res) => {
  try {
    const { collection, id } = req.params;

    let Model;
    switch (collection) {
      case 'users':
        Model = User;
        break;
      case 'checklists':
        Model = Checklist;
        break;
      case 'itineraries':
        Model = Itinerary;
        break;
      case 'weddingDetails':
        Model = WeddingDetails;
        break;
      case 'contacts':
        Model = Contact;
        break;
      default:
        return res.status(400).json({ error: 'Invalid collection' });
    }

    const result = await Model.findByIdAndDelete(id);
    
    if (!result) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Failed to delete document' });
  }
};
