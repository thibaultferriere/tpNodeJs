package ejb;

import fr.cpe.UserModel;

public interface MessageSenderLocal {
    public void sendMessage(String message);
    public void sendMessage(UserModel user);
}
