package ejb;

import fr.cpe.UserModel;

import javax.ejb.Local;

@Local
public interface MessageSenderLocal {
    public void sendMessage(String message);
    public void sendMessage(UserModel user);
}