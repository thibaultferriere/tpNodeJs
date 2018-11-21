package ejb;

import fr.cpe.UserModel;

import javax.ejb.Local;

@Local
public interface MessageReceiverSyncLocal {
    public UserModel receiveMessage();
}
