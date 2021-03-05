import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.BufferedWriter;
import java.util.List;
import java.util.ArrayList;

public class InsertData{
    public static void main(String args[]){

        BufferedReader br_csv = null;

        //***********read csv file***************
        //the number of people is 30 + title = 31
        List<String[]> person = new ArrayList<String[]>(31);

        try{
            br_csv = new BufferedReader(new InputStreamReader(new FileInputStream("profile.csv")));
            
            //the number of entry is 8
            String[] data = new String[8];
            String line;
            int i = 0;
            
            //read csv file => List person
            while((line = br_csv.readLine()) != null){
                data = line.split(",");
                person.add(i,data);
                i++;
            }
        }
        catch(Exception e){
            e.printStackTrace();
        }
        finally{
            try {
                br_csv.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        //************Replacement****************
        //i=0 is title row
        for(int i=1; i<person.size(); i++){            
            BufferedReader br_html = null;
            BufferedWriter bw = null;

            try{
                //sorce file is person0.html
                br_html = new BufferedReader(new InputStreamReader(new FileInputStream("person0.html"),"UTF-8"));
                bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream("person" + (i) + ".html"),"UTF-8"));

                String line;

                for(int j=0; j<person.get(0).length; j++){
                    while((line = br_html.readLine()) != null){

                        //replacement
                        String replaceText = line.replace("Replace" + (j+1), person.get(i)[j]);
                        bw.write(replaceText);
                        bw.newLine();

                        if(replaceText != line){
                            break;
                        }
                    }
                }
                while((line = br_html.readLine())!= null){
                    bw.write(line);
                    bw.newLine();
                }
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally{
                if(br_html != null){
                    try {
                    br_html.close();
                    }
                    catch (Exception e) {
                        e.printStackTrace();
                    }
                }
                if(bw != null){
                    try{
                        bw.close();
                    }
                    catch(Exception e){
                        e.printStackTrace();
                    }
                }
            }
        }
    }
}