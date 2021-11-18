#include "Graph.h"
Graph::Graph(int ArrayLen)
{
    this->Size=ArrayLen;
    Array=new NodeGraph [ArrayLen];
}
Graph::~Graph()
{
    delete [] Array;
}
void Graph::AddEdge(int OgNode,int DestNode,int Weight)
{
    Array[OgNode].getLista().AddBack({DestNode,Weight});
}
void Graph::LoadFromFile(string FileDirection)
{
    int OgNodeAux,DestNodeAux,Weight;
    ifstream File;
    File.open(FileDirection);
    while(File>>OgNodeAux && File>>DestNodeAux && File>>Weight)
    {
        AddEdge(OgNodeAux,DestNodeAux,Weight);
    }
    File.close();
}
bool Graph::AmplitudeSearch(int Origin,int Destiny)
{
    int I,Vertex;
    int* Adjacent;
    bool Found=false;
    Array[Origin].setMarked(true);
    queue<int> Queue;
    Queue.push(Origin);
    while(Queue.empty()==false && Found==false)
    {
        I=0;
        Vertex=Queue.front();
        Queue.pop();
        Adjacent=&Array[Vertex].getLista()[I]->first;
        while(Adjacent!=NULL && Found==false)
        {
            if(Array[*Adjacent].getMarked()==false)
            {
                Array[*Adjacent].setFather(Vertex);
                if(*Adjacent==Destiny)
                {
                    Found=true;
                }
                else
                {
                    Array[*Adjacent].setMarked(true);
                    Queue.push(*Adjacent);
                }
            }
            I++;
            Adjacent=&Array[Vertex].getLista()[I]->first;
        }
    }
    return Found;

}
void Graph::SetNodesToInitialState()
{
    for(int i=0;i<Size;i++)
    {
        Array[i].setNodeGraphToInitialState();
    }
}

vector<int> Graph::GetSavedPath(int Destiny)
{
    vector<int> ans;
    int pos=Destiny;
    int aux;
    if(Array[Destiny].getFather()!=-1)
    {
        ans.insert(ans.begin(),Destiny);
    }
    while(Array[pos].getFather()!=-1)
    {
        aux=Array[pos].getFather();
        ans.insert(ans.begin(),aux);
        pos=aux;
    }
    SetNodesToInitialState();
    return ans;
}
void Graph::DeepSearchAlg(int Origin,int Destiny,bool* Found)
{
    *Found=false;
    Array[Origin].setMarked(true);
    int I=0;
    int* Adjacent= &Array[Origin].getLista()[I]->first;
    while (Adjacent!=NULL)
    {
        if(*Found==false && Array[*Adjacent].getMarked()==false)
        {
            Array[*Adjacent].setFather(Origin);
            if(*Adjacent==Destiny)
            {
                *Found=true;
            }
            else
            {
                DeepSearchAlg(*Adjacent,Destiny,Found);
            }
        }
        I++;
        Adjacent=&Array[Origin].getLista()[I]->first;
    }
}
bool Graph::DeepSearch(int Origin,int Destiny)
{
    bool Found=false;
    DeepSearchAlg(Origin,Destiny,&Found);
    return Found;
}
void Graph::ShowGraph(void (funcToShowFirstOfAnIntPair)(pair<int,int>*))
{
    for(int i=0;i<Size;i++)
    {
        cout<<"Adyacencias de "<<i<<": ";
        Array[i].getLista().Show(funcToShowFirstOfAnIntPair);
        cout<<"\n";
    }
}

vector<int> Graph::AmplitudeSearchWotDestiny(int Origin)
{
    int I,Vertex;
    int* Adjacent;
    Array[Origin].setMarked(true);
    queue<int> Queue;
    Queue.push(Origin);
    while(Queue.empty()==false)
    {
        I=0;
        Vertex=Queue.front();
        Queue.pop();
        Adjacent= &Array[Vertex].getLista()[I]->first ;
        while(Adjacent!=NULL)
        {
            if(Array[*Adjacent].getMarked()==false)
            {
                Array[*Adjacent].setFather(Vertex);
                Array[*Adjacent].setMarked(true);
                Queue.push(*Adjacent);
            }
            I++;
            Adjacent=&Array[Vertex].getLista()[I]->first ;
        }
    }
}

void Graph::showPathsToOrigin(int Origin)
{
    vector<int> aux;
    int auxFather;
    for(int i=0;i<Size;i++)
    {
        if(Array[i].getMarked() && i!=Origin)
        {
            cout<<"camino de "<<Origin<<" a "<<i<<endl;
            auxFather=i;
            do
            {
                aux.insert(aux.begin(),auxFather);
                auxFather=Array[auxFather].getFather();
            } while (auxFather!=-1);
            for(int i=0;i<aux.size();i++)
            {
                cout<<aux[i]<<" ";
            }
            aux.clear();
            cout<<endl;
        }
    }
    SetNodesToInitialState();
}
void Graph::showPathsToOriginWithValues(int Origin)
{
    vector<int> aux;
    int auxFather;
    int auxDistance;
    for(int i=0;i<Size;i++)
    {
        if(Array[i].getMarked() && i!=Origin)
        {
            cout<<"camino de "<<Origin<<" a "<<i<<endl;
            auxFather=i;
            auxDistance=Array[i].getDistance();
            do
            {
                aux.insert(aux.begin(),auxFather);
                auxFather=Array[auxFather].getFather();
            } while (auxFather!=-1);
            for(int i=0;i<aux.size();i++)
            {
                cout<<aux[i]<<" ";
            }
            cout<<"Valor del camino: "<<auxDistance;
            aux.clear();
            cout<<endl;
        }
    }
    SetNodesToInitialState();
}

void Graph::Dijkstra(int Origin)
{
    class Comparator
    {
    public:
        int operator() (pair<int,int>& p1, pair<int,int>& p2)
        {
            return p1.first>p2.first;
        }
    };
    pair<int,int> Duo;
    int Vertex,I;
    pair<int,int>* Adjacent;
    priority_queue <pair<int,int>, vector<pair<int,int>>,Comparator > Queue;
    Array[Origin].setDistance(0);
    Queue.push({Array[Origin].getDistance(),Origin});
    while(Queue.empty()!=true)
    {
        Duo=Queue.top();
        Queue.pop();
        Vertex=Duo.second;
        I=0;
        if(Array[Vertex].getMarked()==false)
        {
            Array[Vertex].setMarked(true);
            Adjacent= Array[Vertex].getLista()[I] ;
        }
        while (Adjacent!=NULL)
        {
            if(Array[Adjacent->first].getMarked()==false && Adjacent->second>0 )
            {
                if(Array[Vertex].getDistance()+Adjacent->second  <  Array[Adjacent->first].getDistance())
                {
                    Array[Adjacent->first].setDistance(Array[Vertex].getDistance()+Adjacent->second);
                    Array[Adjacent->first].setFather(Vertex);
                    Queue.push({Array[Adjacent->first].getDistance(),Adjacent->first});
                }
            }
            I++;
            Adjacent= Array[Vertex].getLista()[I] ;
        }
        
    }
}
