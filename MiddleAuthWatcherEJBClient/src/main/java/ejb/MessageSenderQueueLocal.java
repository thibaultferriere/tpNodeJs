package ejb;

import fr.cpe.UserModel;

import javax.ejb.Local;

@Local
public interface MessageSenderQueueLocal {
    public void sendMessage(String message);
    public void sendMessage(UserModel user);

}
